import { IExecuteFunctions } from 'n8n-workflow';
import { getAnclapToml } from '../../../transport/anclapToml';
import SEP24 from '../../../transport/SEP24';
import SEP6 from '../../../transport/SEP6';
import { Protocol, TransactionType } from '../../../transport/transactionInfoTypes';
import TransactionsRequest from '../../../transport/requests/TransactionsRequest/TransactionsRequest';

export async function transactions(this: IExecuteFunctions) {
	const token = this.getNodeParameter('token', 0) as string;
	const transactionType = this.getNodeParameter('transactionType', 0) as TransactionType;
	const protocol = this.getNodeParameter('protocol', 0) as Protocol;
	const assetCode = this.getNodeParameter('assetCode', 0) as string;
	const publicKey = this.getNodeParameter('publicKey', 0) as string;
	const anclapToml = await getAnclapToml.call(this);
	const request = new TransactionsRequest({
		code: assetCode,
		account: publicKey,
		kind: transactionType,
	});

	if (protocol === 'sep24') {
		return await getSep24Transactions();
	} else {
		return await getSep6Transactions();
	}

	async function getSep24Transactions() {
		const sep24 = new SEP24(anclapToml, token);
		return await sep24.getTransactions(request);
	}

	async function getSep6Transactions() {
		const sep6 = new SEP6(anclapToml, token);
		return await sep6.getTransactions(request);
	}
}
