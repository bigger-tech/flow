import { IExecuteFunctions } from 'n8n-workflow';
import AnclapCredentials from '../../../transport/AnclapCredentials';
import SEP24 from '../../../transport/SEP24';
import SEP6 from '../../../transport/SEP6';
import { Protocol, TransactionType } from '../../../transport/types';
import TransactionsRequest from '../../../transport/requests/TransactionsRequest/TransactionsRequest';
import ITransactionsRequest from '../../../transport/requests/TransactionsRequest/ITransactionsRequest';

export async function transactions(this: IExecuteFunctions) {
	const anclapCredentials = new AnclapCredentials(await this.getCredentials('anclapApi'));
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
	async function getSep24Transactions() {
		const sep24 = new SEP24(anclapCredentials, token);
		return await sep24.getTransactions(transactionsRequest);
	}

	async function getSep6Transactions() {
		const sep6 = new SEP6(anclapCredentials, token);
		return await sep6.getTransactions(transactionsRequest);
	}

	if (protocol === 'sep24') {
		return await getSep24Transactions();
	} else {
		return await getSep6Transactions();
	}
}
