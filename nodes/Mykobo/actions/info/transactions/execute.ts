import { IExecuteFunctions } from 'n8n-workflow';
import AnchorCredentials from '../../../../../common/repository/anchor/AnchorCredentials';
import { ProtocolEnum } from '../../../../../common/enum/anchor/protocolEnum';
import ITransactionsRequest from '../../../../../common/requests/anchor/TransactionsRequest/ITransactionsRequest';
import { TransactionType } from '../../../../../common/types/anchor/TransactionType';
import TransactionsRequest from '../../../../../common/requests/anchor/TransactionsRequest/TransactionsRequest';
import getProtocolProvider from '../../../../../common/repository/anchor/providers/protocolProvider';

export async function getTransactions(this: IExecuteFunctions) {
	const mykoboCredentials = new AnchorCredentials(await this.getCredentials('mykoboApi'));
	const token = this.getNodeParameter('token', 0) as string;
	const protocol = this.getNodeParameter('protocol', 0) as ProtocolEnum;

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
