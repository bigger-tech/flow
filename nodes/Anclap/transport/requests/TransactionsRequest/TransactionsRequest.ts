import { TransactionType } from '../../types';
import ITransactionsRequest from './ITransactionsRequest';

export default class TransactionsRequest implements ITransactionsRequest {
	public assetCode: string;
	public kind: '' | TransactionType = '';

	constructor(request: ITransactionsRequest) {
		this.assetCode = request.assetCode;

		if (request.kind !== 'default') {
			this.kind = request.kind;
		}
	}
}
