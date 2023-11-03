import { IExecuteFunctions } from 'n8n-workflow';
import { TransactionBuilder, Keypair, Server, SorobanRpc } from 'soroban-client';
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

	if (isSubmitToggleOn) {
		try {
			transactionResult = await server.sendTransaction(transaction);
		} catch (error) {
			throw new Error(error.response.data.extras.result_codes.operations || error);
		}
	}

	return { result: transactionResult, transaction: transaction.toXDR() };
}
