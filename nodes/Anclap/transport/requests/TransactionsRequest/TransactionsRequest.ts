import { TransactionType } from '../../transactionInfoTypes';
import ITransactionsRequest from './ITransactionsRequest';

export default class TransactionsRequest implements ITransactionsRequest {
	public code: string;
	public account: string;
	public kind: '' | TransactionType = '';

	constructor(request: ITransactionsRequest) {
		this.code = request.code;
		this.account = request.account;

		if (request.kind !== 'default') {
			this.kind = request.kind;
		}
	}
}
