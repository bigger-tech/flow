export default interface IGetTransactionRequest {
	id: string;
	accountId?: string;
	memoType?: string;
	memo?: string;
}
