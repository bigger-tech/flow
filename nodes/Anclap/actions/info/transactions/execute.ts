import { IExecuteFunctions } from 'n8n-workflow';
import AnclapCredentials from '../../../transport/AnclapCredentials';
import SEP24 from '../../../transport/SEP24';
import SEP6 from '../../../transport/SEP6';
import { Protocol, TransactionType } from '../../../transport/types';
import TransactionsRequest from '../../../transport/requests/TransactionsRequest/TransactionsRequest';
export async function transactions(this: IExecuteFunctions) {
	const anclapCredentials = new AnclapCredentials(await this.getCredentials('anclapApi'));
	const token = this.getNodeParameter('token', 0) as string;
	const protocol = this.getNodeParameter('protocol', 0) as Protocol;
	const transactionType = this.getNodeParameter('transactionType', 0) as TransactionType;
	const assetCode = this.getNodeParameter('assetCode', 0) as string;
	const request = new TransactionsRequest({
		code: assetCode,
		kind: transactionType,
	});

	if (protocol === 'sep24') {
		return await getSep24Transactions();
	} else {
		return await getSep6Transactions();
	}

	async function getSep24Transactions() {
		const sep24 = new SEP24(anclapCredentials, token);
		return await sep24.getTransactions(request);
	}

	async function getSep6Transactions() {
		const sep6 = new SEP6(anclapCredentials, token);
		return await sep6.getTransactions(request);
	}
}
