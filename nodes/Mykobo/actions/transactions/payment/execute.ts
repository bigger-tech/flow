import { IExecuteFunctions } from 'n8n-workflow';
import SEP31 from '../../../transport/SEP31';
import MykoboCredentials from '../../../transport/MykoboCredentials';
import IPaymentRequest from '../../../transport/requests/DirectPaymentRequest/IPaymentRequest';
import PaymentRequest from '../../../transport/requests/DirectPaymentRequest/DirectPaymentRequest';

export async function payment(this: IExecuteFunctions) {
	const mykoboCredentials = new MykoboCredentials(await this.getCredentials('mykoboApi'));
	const token = this.getNodeParameter('token', 0) as string;
	const assetCode = this?.getNodeParameter('assetCode', 0) as string;
	const amount = this.getNodeParameter('amount', 0) as number;
	const showOptionalValues = this.getNodeParameter('showOptionalValues', 0) as boolean;

	const initiatePayment = async () => {
		const sep31 = new SEP31(mykoboCredentials, token);

		let paymentRequest: IPaymentRequest;

		if (!showOptionalValues) {
			paymentRequest = new PaymentRequest({
				amount,
				assetCode,
			});
		} else {
			const assetIssuer = this?.getNodeParameter('assetIssuer', 0) as string;
			const destinationAsset = this?.getNodeParameter('destinationAsset', 0) as string;
			const quoteId = this?.getNodeParameter('quoteId', 0) as string;
			const senderId = this?.getNodeParameter('senderId', 0) as string;
			const receiverId = this?.getNodeParameter('receiverId', 0) as string;
			const lang = this?.getNodeParameter('lang', 0) as string;
			const refundMemo = this?.getNodeParameter('refundMemo', 0) as string;
			const refundMemoType = this?.getNodeParameter('refundMemoType', 0) as string;
			paymentRequest = new PaymentRequest({
				amount,
				assetCode,
				assetIssuer,
				destinationAsset,
				quoteId,
				senderId,
				receiverId,
				lang,
				refundMemo,
				refundMemoType,
			});
		}
		return await sep31.postInitialPayment(paymentRequest as IPaymentRequest);
	};
	return await initiatePayment();
}
