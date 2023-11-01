import IPaymentRequest from './IPaymentRequest';

export default class PaymentRequest implements IPaymentRequest {
	public amount: number;
	public assetCode: string;
	public assetIssuer?: string;
	public destinationAsset?: string;
	public quoteId?: string;
	public senderId?: string;
	public receiverId?: string;
	public lang?: string;

	constructor(request: IPaymentRequest) {
		const {
			amount,
			assetCode,
			assetIssuer,
			destinationAsset,
			quoteId,
			senderId,
			receiverId,
			lang,
		} = request;

		this.amount = amount;
		this.assetCode = assetCode;
		this.assetIssuer = assetIssuer;
		this.destinationAsset = destinationAsset;
		this.quoteId = quoteId;
		this.senderId = senderId;
		this.receiverId = receiverId;
		this.lang = lang;
	}
}
