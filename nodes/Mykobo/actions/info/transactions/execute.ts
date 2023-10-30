import { IExecuteFunctions } from 'n8n-workflow';
import MykoboCredentials from '../../../transport/MykoboCredentials';
import TransactionsRequest from '../../../transport/requests/TransactionsRequest/TransactionsRequest';
import ITransactionsRequest from '../../../transport/requests/TransactionsRequest/ITransactionsRequest';
import { Protocol } from '../../../transport/enums/protocol';
import { TransactionType } from '../../../transport/types';
import getProtocolProvider from '../../../transport/providers/protocolProvider';

export async function getTransactions(this: IExecuteFunctions) {
	const mykoboCredentials = new MykoboCredentials(await this.getCredentials('mykoboApi'));
	const token = this.getNodeParameter('token', 0) as string;
	const protocol = this.getNodeParameter('protocol', 0) as Protocol;

	const assetCode = this.getNodeParameter('assetCode', 0) as string;

	const showOptionalValues = this.getNodeParameter('showOptionalValues', 0) as boolean;

	let transactionsRequest: ITransactionsRequest;

	if (showOptionalValues) {
		const kind = this.getNodeParameter('kind', 0) as TransactionType;
		const noOlderThan = this.getNodeParameter('noOlderThan', 0) as string;
		const limit = this.getNodeParameter('limit', 0) as number;
		const pagingId = this.getNodeParameter('pagingId', 0) as string;
		const lang = this.getNodeParameter('lang', 0) as string;

		transactionsRequest = new TransactionsRequest({
			assetCode,
			kind,
			noOlderThan,
			limit,
			pagingId,
			lang,
		});
	} else {
		transactionsRequest = new TransactionsRequest({ assetCode });
	}

	const transactionsProvider = getProtocolProvider(mykoboCredentials, token, protocol);

	return await transactionsProvider.getTransactions(transactionsRequest);
}
