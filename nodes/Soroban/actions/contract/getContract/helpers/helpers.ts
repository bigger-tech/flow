import { Contract, Server, SorobanRpc, scValToNative, xdr, StrKey } from 'soroban-client';
import { IStorageElement } from '../../../../../../common/interfaces/soroban/IStorageElement';

export function getContractHash(contractId: string) {
	try {
		const contract = new Contract(contractId);
		return contract.address().toScAddress().contractId().toString('hex');
	} catch (e) {
		throw new Error('Cannot get contract hash');
	}
}

export const getContractAddress = (contractHash: string) => {
	return StrKey.encodeContract(hexToByte(contractHash));
};

export async function getContractAbi(contractAddress: string, server: Server) {
	const contract = await getContractData(contractAddress, server);

	if (!contract) {
		throw new Error('Contract not found');
	}

	const code = await getContractCode(contract.wasmId, server);
	const buffer = Buffer.from(code?.wasmCode || '', 'hex');

	const executable = new WebAssembly.Module(buffer);
	const contractSpecificationSection = WebAssembly.Module.customSections(
		executable,
		'contractspecv0',
	);

	const functions: object[] = [];
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

	if (!ledgerEntries || !ledgerEntries.entries || !ledgerEntries.entries.length) {
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

	if (!ledgerEntries || !ledgerEntries.entries) {
		return null;
	}

	const ledgerEntry = ledgerEntries.entries[0] as SorobanRpc.LedgerEntryResult;
	const wasmCodeLedger = ledgerEntry.lastModifiedLedgerSeq as number;
	const codeEntry = ledgerEntry.val;
	const wasmCode = codeEntry.contractCode().code().toString('hex');

	return { wasmCode, wasmCodeLedger };
}

async function decodeContractSpecBuffer(buffer: ArrayBuffer) {
	const uint8 = new Uint8Array(buffer);
	const decodedEntries = [];

	let offset = 0;

	while (offset < uint8.length) {
		const { partialDecodedEntry, length } = tryDecodeEntry(uint8, offset);

		if (partialDecodedEntry) {
			decodedEntries.push(partialDecodedEntry);
			offset += length;
		} else {
			break;
		}
	}

	return decodedEntries;
}

const tryDecodeEntry = (uint8: Uint8Array, offset: number) => {
	for (let length = 1; length <= uint8.length - offset; length++) {
		const subArray = uint8.subarray(offset, offset + length);

		try {
			const partialDecodedEntry = xdr.ScSpecEntry.fromXDR(Buffer.from(subArray));
			return { partialDecodedEntry, length };
		} catch (e) {
			console.error(e.message);
		}
	}

	return { partialDecodedEntry: null, length: 0 };
};

function hexToByte(hexString: string) {
	const hexCompleteLength = 2;
	const radix = 16;
	if (hexString.length % hexCompleteLength !== 0) {
		throw new Error('Must have an even number of hex digits to convert to bytes');
	}
	var numBytes = hexString.length / hexCompleteLength;
	var byteArray = Buffer.alloc(numBytes);
	for (let i = 0; i < numBytes; i++) {
		byteArray[i] = parseInt(hexString.substr(i * hexCompleteLength, hexCompleteLength), radix);
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
