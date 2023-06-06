import { TransactionType } from '../transactionInfoTypes';

export default class TransactionsRequest {
	public code: string;
	public account: string;
	public kind: '' | TransactionType = '';

	constructor(code: string, account: string, kind: TransactionType) {
		this.code = code;
		this.account = account;
		this.kind = kind !== 'default' ? kind : this.kind;
	}
}
