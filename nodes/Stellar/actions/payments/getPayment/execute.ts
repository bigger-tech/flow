import { IExecuteFunctions } from 'n8n-workflow';
import { Server } from 'stellar-sdk';
import { setNetwork } from '../../../transport';

export async function getPayment(this: IExecuteFunctions) {
	const publicKey = this.getNodeParameter('publicKey', 1) as string;
	const stellarNetwork = await setNetwork.call(this);

	const server = new Server(stellarNetwork.url as string);
	const payments = await server.payments().forAccount(publicKey).call();
	const lastPayment = payments.records[payments.records.length - 1];

	return { payment: lastPayment };
}
