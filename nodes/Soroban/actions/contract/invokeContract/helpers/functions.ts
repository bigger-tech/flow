import { xdr, Address, Server } from 'soroban-client';

export function hexToByte(hexString: string) {
	if (hexString.length % 2 !== 0) {
		throw 'Must have an even number of hex digits to convert to bytes';
	}
	let numBytes = hexString.length / 2;
	let byteArray = Buffer.alloc(numBytes);
	for (let i = 0; i < numBytes; i++) {
		byteArray[i] = parseInt(hexString.substring(i * 2, 2), 16);
	}
	return byteArray;
}

export async function getInstanceValue(contractId: string): Promise<xdr.ContractDataEntry> {
	const server = new Server('https://rpc-futurenet.stellar.org');
	try {
		const instanceKey = xdr.LedgerKey.contractData(
			new xdr.LedgerKeyContractData({
				contract: new Address(contractId).toScAddress(),
				key: xdr.ScVal.scvLedgerKeyContractInstance(),
				durability: xdr.ContractDataDurability.persistent(),
			}),
		);

		const response = await server.getLedgerEntries(instanceKey);
		console.log(response.entries[0]);
		console.log(response.latestLedger);
		console.log(response);
		if (response.entries.length === 0) throw new Error('No instance found');
		const dataEntry = response.entries[0].val.contractData();
		return dataEntry;
	} catch (error) {
		throw new Error('Error while getting instance value: ', error);
	}
}

export async function getWasmCode(instance: xdr.ScContractInstance): Promise<Buffer> {
	const server = new Server('https://rpc-futurenet.stellar.org');
	try {
		const codeKey = xdr.LedgerKey.contractCode(
			new xdr.LedgerKeyContractCode({
				hash: instance.executable().wasmHash(),
			}),
		);

		const response = await server.getLedgerEntries(codeKey);
		const wasmCode = response.entries[0].val.contractCode().code();
		return wasmCode;
	} catch (error) {
		throw new Error('Error while getting wasm code: ', error);
	}
}
