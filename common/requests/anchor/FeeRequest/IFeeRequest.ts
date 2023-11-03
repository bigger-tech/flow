import { OffChainOperationType } from '../../../types/anchor/OffChainOperationType';
import { TransactionType } from '../../../types/anchor/TransactionType';

export default interface IFeeRequest {
	operation: TransactionType;
	type?: OffChainOperationType;
	assetCode: string;
	amount: number;
}
