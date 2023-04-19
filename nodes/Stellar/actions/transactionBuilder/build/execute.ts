import { IExecuteFunctions } from 'n8n-workflow';
import { BASE_FEE, Server, TransactionBuilder } from 'stellar-sdk';
import { setNetwork } from '../../../transport';

export async function build(this: IExecuteFunctions) {
	try {
		const stellarNetwork = await setNetwork.call(this);
		const server = new Server(stellarNetwork.url as string);
		const sourceAccount = this.getNodeParameter('publicKey', 1) as string;
		const fee = this.getNodeParameter('fee', 1) as string;
		const timeout = this.getNodeParameter('timeout', 1) as number;

		const transaction = new TransactionBuilder(await server.loadAccount(sourceAccount), {
			fee: fee || BASE_FEE,
			networkPassphrase: stellarNetwork.passphrase,
		})
			.setTimeout(timeout | 30)
			.build();

		return { transaction: transaction.toXDR() };
	} catch (error) {
		throw new Error(error);
	}
}
