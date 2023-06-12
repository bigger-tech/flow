import { TransactionType } from '../../types';
import ITransactionsRequest from './ITransactionsRequest';

export default class TransactionsRequest implements ITransactionsRequest {
	public code: string;
	public kind: '' | TransactionType = '';

	constructor(request: ITransactionsRequest) {
		this.code = request.code;

		if (request.kind !== 'default') {
			this.kind = request.kind;
		}
	}
}
