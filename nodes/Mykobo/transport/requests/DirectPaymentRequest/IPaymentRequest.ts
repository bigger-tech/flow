export default interface IPaymentRequest {
	amount: number;
	assetCode: string;
	assetIssuer?: string;
	destinationAsset?: string;
	quoteId?: string;
	senderId?: string;
	receiverId?: string;
	lang?: string;
	refundMemo?: string;
	refundMemoType?: string | number;
}
