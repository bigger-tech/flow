import { Contract, Server, SorobanRpc, scValToNative, xdr, StrKey } from 'soroban-client';
import { IStorageElement } from '../../../../../../common/interfaces/soroban/IStorageElement';

export function getContractHash(contractId: string) {
	try {
		const c = new Contract(contractId);
		return c.address().toScAddress().contractId().toString('hex');
	} catch (e) {
		return '';
	}
}

export const getContractAddress = (contractHash: string) => {
	return StrKey.encodeContract(hexToByte(contractHash));
};

export async function getContractABI(contractAddress: string, server: Server) {
	const data = await getContractData(contractAddress, server);

	if (!data) {
		return '';
	}

	const code = await getContractCode(data.wasmId, server);
	const buffer = Buffer.from(code?.wasmCode || '', 'hex');

	const executable = new WebAssembly.Module(buffer);
	const contractSpecificationSection = WebAssembly.Module.customSections(
		executable,
		'contractspecv0',
	);

	let functions: any[] = [];
	for (const item of contractSpecificationSection) {
		const entries = await decodeContractSpecBuffer(item);

		entries.forEach((entry: xdr.ScSpecEntry) => {
			if (entry.switch() === xdr.ScSpecEntryKind.scSpecEntryFunctionV0()) {
				const functionV0 = entry.value() as xdr.ScSpecFunctionV0;
				const name = functionV0.name().toString();
				const doc = functionV0.doc().toString();

				const inputs = functionV0.inputs().map((input: xdr.ScSpecFunctionInputV0) => ({
					doc: input.doc().toString(),
					name: input.name().toString(),
					value: input.type().switch().value,
					type: input.type().switch().name,
				}));

				const outputs = functionV0.outputs().map((output: xdr.ScSpecTypeDef) => ({
					value: output.switch().value,
					type: output.switch().name,
				}));

				functions.push({ doc, name, inputs, outputs });
			}
		});
	}
	return functions;
}

async function getContractData(contractAddress: string, server: Server) {
	const ledgerKey = xdr.LedgerKey.contractData(
		new xdr.LedgerKeyContractData({
			contract: new Contract(contractAddress).address().toScAddress(),
			key: xdr.ScVal.scvLedgerKeyContractInstance(),
			durability: xdr.ContractDataDurability.persistent(),
		}),
	);

	let ledgerEntries;
	try {
		ledgerEntries = await server.getLedgerEntries(ledgerKey);
	} catch (e) {
		console.error(e.message);
	}

	if (ledgerEntries == null || ledgerEntries.entries == null || ledgerEntries.entries.length == 0) {
		return null;
	}

	const ledgerEntry = ledgerEntries.entries[0] as SorobanRpc.LedgerEntryResult;
	const codeData = ledgerEntry.val.contractData();
	const wasmIdLedger = ledgerEntry.lastModifiedLedgerSeq;
	const contractInstance = codeData.val().instance();
	const wasmId = contractInstance.executable().wasmHash();
	const contractStorage = contractInstance.storage();
	const storage = contractStorage ? convertStorage(contractStorage) : [];

	return { wasmId, wasmIdLedger, storage };
}

async function getContractCode(
	wasmId: Buffer,
	server: Server,
): Promise<{ wasmCode: string; wasmCodeLedger: number } | null> {
	const ledgerKey = xdr.LedgerKey.contractCode(
		new xdr.LedgerKeyContractCode({
			hash: wasmId,
		}),
	);

	const ledgerEntries = await server.getLedgerEntries(ledgerKey);

	if (ledgerEntries == null || ledgerEntries.entries == null) {
		return null;
	}

	const ledgerEntry = ledgerEntries.entries[0] as SorobanRpc.LedgerEntryResult;
	const wasmCodeLedger = ledgerEntry.lastModifiedLedgerSeq as number;
	const codeEntry = ledgerEntry.val;
	const wasmCode = codeEntry.contractCode().code().toString('hex');

	return { wasmCode, wasmCodeLedger };
}

async function decodeContractSpecBuffer(buffer: ArrayBuffer) {
	const bufferData = new Uint8Array(buffer);
	const decodedEntries = [];

	let offset = 0;

	while (offset < bufferData.length) {
		const { partialDecodedData, length } = tryDecodeEntry(bufferData, offset);

		if (partialDecodedData) {
			decodedEntries.push(partialDecodedData);
			offset += length;
		} else {
			console.log('Failed to decode further. Stopping.');
			break;
		}
	}

	return decodedEntries;
}

const tryDecodeEntry = (bufferData: Uint8Array, offset: number) => {
	for (let length = 1; length <= bufferData.length - offset; length++) {
		const subArray = bufferData.subarray(offset, offset + length);

		try {
			const partialDecodedData = xdr.ScSpecEntry.fromXDR(Buffer.from(subArray));
			return { partialDecodedData, length };
		} catch (e) {
			console.error(e.message);
		}
	}

	return { partialDecodedData: null, length: 0 };
};

function hexToByte(hexString: string) {
	if (hexString.length % 2 !== 0) {
		throw new Error('Must have an even number of hex digits to convert to bytes');
	}
	var numBytes = hexString.length / 2;
	var byteArray = Buffer.alloc(numBytes);
	for (var i = 0; i < numBytes; i++) {
		byteArray[i] = parseInt(hexString.substr(i * 2, 2), 16);
	}
	return byteArray;
}

const convertStorage = (storage: ReadonlyArray<xdr.ScMapEntry>): ReadonlyArray<IStorageElement> =>
	storage.map((el) => ({
		key: scValToNative(el.key()).toString(),
		keyType: el.key().switch().name,
		value: scValToNative(el.val()).toString(),
		valueType: el.val().switch().name,
	}));
