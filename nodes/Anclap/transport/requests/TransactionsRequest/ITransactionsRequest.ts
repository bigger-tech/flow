import { TransactionType } from '../../transactionInfoTypes';

export default interface ITransactionsRequest {
	code: string;
	account: string;
	kind: '' | TransactionType;
}
