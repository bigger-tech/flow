import { IExecuteFunctions } from 'n8n-workflow';
import {
	TransactionBuilder,
	Keypair,
	Server,
	SorobanRpc,
	xdr as XDR,
	Contract,
} from 'soroban-client';
import { SorobanNetwork } from '../../../transport';

type SecretKeys = {
	keys: {
		name: string;
		key: string;
	}[];
};

export async function sign(this: IExecuteFunctions) {
	const stellarNetwork = await SorobanNetwork.setNetwork.call(this);
	const server = new Server(stellarNetwork.url);
	const xdr = this.getNodeParameter('xdr', 0) as string;
	const { keys } = this.getNodeParameter('secretKeys', 0) as SecretKeys;
	const isSubmitToggleOn = this.getNodeParameter('submit', 0) as boolean;
	const transaction = TransactionBuilder.fromXDR(xdr as string, stellarNetwork.passphrase);

	let transactionResult: SorobanRpc.BaseSendTransactionResponse | undefined;

	for (const { key } of keys) {
		const keypair = Keypair.fromSecret(key);
		transaction.sign(keypair);
	}
	// const wasmId = Buffer.from('b053248d579b13717ea635c70727658eb8fee731c01f658152ddc72a1035e246', 'hex')
	// console.log(await getContractCode(server,wasmId ))

	if (isSubmitToggleOn) {
		try {
			transactionResult = await server.sendTransaction(transaction);
			let getTxResp;
			while (true) {
				console.log('Waiting for transaction to be confirmed');
				getTxResp = await server.getTransaction(transactionResult.hash);
				// Exit the loop when the transaction is no longer in the NOT_FOUND status.
				console.log(getTxResp.status);
				if (getTxResp.status != SorobanRpc.GetTransactionStatus.NOT_FOUND) {
					break;
				}
				// Wait for 1 second before checking again.
				await new Promise((resolve) => setTimeout(resolve, 1000));
			}

			if (getTxResp.status == SorobanRpc.GetTransactionStatus.SUCCESS && getTxResp.resultMetaXdr) {
				const buff = Buffer.from(getTxResp.resultMetaXdr.toXDR('base64'), 'base64');
				const txMeta = XDR.TransactionMeta.fromXDR(buff);
				console.log(txMeta.toXDR('base64'));

				const contractId =
					txMeta.v3().sorobanMeta()?.returnValue().address().contractId().toString('base64') || '';
				console.log(contractId);
				try {
					const contractData = await getContractData(server, contractId);
					if (contractData) {
						console.log('Contract WASM ID:', contractData.wasmId);
						console.log('WASM ID Ledger:', contractData.wasmIdLedger);
						//  console.log('Contract Storage:', contractData.storage);
					} else {
						console.log('Contract data not found.');
					}
				} catch (error) {
					console.error('Error:', error.message);
				}
			}
		} catch (error) {
			throw new Error(error.response.data.extras.result_codes.operations || error);
		}
	}

	return { result: transactionResult, transaction: transaction.toXDR() };
}

// async function  getContractCode(server: Server,	wasmId: Buffer): Promise<{ wasmCode: string, wasmCodeLedger: number } | null> {
// 	const ledgerKey = XDR.LedgerKey.contractCode(
// 			new XDR.LedgerKeyContractCode({
// 					hash: wasmId
// 			})
// 	);

// 	const ledgerEntries = await server.getLedgerEntries(ledgerKey);

// 	if (ledgerEntries == null || ledgerEntries.entries == null) {
// 			return null;
// 	}

// 	const ledgerEntry = ledgerEntries.entries[0] as SorobanRpc.LedgerEntryResult;

// 	const wasmCodeLedger = ledgerEntry.lastModifiedLedgerSeq as number;

// 	// const codeEntry = xdr.LedgerEntryData.fromXDR(ledgerEntry.xdr, 'base64');
// 	const codeEntry = ledgerEntry.val;
// 	const wasmCode = codeEntry.contractCode().code().toString('hex');

// 	return { wasmCode, wasmCodeLedger };
// }

async function getContractData(server: Server, contractAddress: string) {
	const ledgerKey = XDR.LedgerKey.contractData(
		new XDR.LedgerKeyContractData({
			contract: new Contract(contractAddress).address().toScAddress(),
			key: XDR.ScVal.scvLedgerKeyContractInstance(),
			durability: XDR.ContractDataDurability.persistent(),
		}),
	);

	let ledgerEntries;
	try {
		ledgerEntries = await server.getLedgerEntries(ledgerKey);
	} catch (error) {
		console.error(error);
	}

	if (ledgerEntries == null || ledgerEntries.entries == null || ledgerEntries.entries.length == 0) {
		return null;
	}

	const ledgerEntry = ledgerEntries.entries[0] as SorobanRpc.LedgerEntryResult;

	// const codeData = xdr.LedgerEntryData
	//     .fromXDR(ledgerEntry.xdr, 'base64')
	//     .contractData();
	const codeData = ledgerEntry.val.contractData();

	const wasmIdLedger = ledgerEntry.lastModifiedLedgerSeq;

	const contractInstance = codeData.val().instance();
	const wasmId = contractInstance.executable().wasmHash();

	// const contractStorage = contractInstance.storage();
	// const storage = contractStorage ? this.convertStorage(contractStorage) : [];

	return { wasmId, wasmIdLedger };
}
