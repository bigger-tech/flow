import { TransactionType } from '../../types';

export default interface ITransactionsRequest {
	code: string;
	kind: '' | TransactionType;
}
