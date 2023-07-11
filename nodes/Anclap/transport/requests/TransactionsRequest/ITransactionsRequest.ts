import { TransactionType } from '../../types';

export default interface ITransactionsRequest {
	assetCode: string;
	kind: '' | TransactionType;
}
