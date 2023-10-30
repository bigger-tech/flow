import { IExecuteFunctions } from 'n8n-workflow';
import MykoboCredentials from '../../../transport/MykoboCredentials';
import TransactionRequest from '../../../transport/requests/TransactionRequest/TransactionRequest';
import ITransactionRequest from '../../../transport/requests/TransactionRequest/ITransactionRequest';
import { Protocol } from '../../../transport/enums/protocol';
import getProtocolProvider from '../../../transport/providers/protocolProvider';

export async function getTransaction(this: IExecuteFunctions) {
	const mykoboCredentials = new MykoboCredentials(await this.getCredentials('mykoboApi'));
	const protocol = this.getNodeParameter('protocol', 0) as Protocol;
	const token = this.getNodeParameter('token', 0) as string;

	const id = this.getNodeParameter('id', 0) as string;

	const showOptionalValues = this.getNodeParameter('showOptionalValues', 0) as boolean;

	let transactionRequest: ITransactionRequest;

	if (showOptionalValues) {
		const stellarTransactionId = this.getNodeParameter('stellarTransactionId', 0) as string;
		const externalTransactionId = this.getNodeParameter('externalTransactionId', 0) as string;
		const lang = this.getNodeParameter('lang', 0) as string;

		if (!id && !stellarTransactionId && !externalTransactionId) {
			throw new Error(
				'One of these properties: Transaction ID, Stellar Transaction ID or External transaction ID is required in order to execute this node',
			);
		}

		transactionRequest = new TransactionRequest({
			id,
			stellarTransactionId,
			externalTransactionId,
			lang,
		});
	} else {
		if (!id) {
			throw new Error('Transaction Id is required');
		}
		transactionRequest = new TransactionRequest({ id });
	}

	const transactionProvider = getProtocolProvider(mykoboCredentials, token, protocol);

	return await transactionProvider.getTransactionById(transactionRequest);
}
