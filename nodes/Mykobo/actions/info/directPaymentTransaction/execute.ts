import { IExecuteFunctions } from 'n8n-core';
import MykoboCredentials from '../../../transport/MykoboCredentials';
import SEP31 from '../../../transport/SEP31';
import IGetTransactionRequest from '../../../transport/requests/DirectPaymentRequest/IGetTransactionRequest';

export async function getTransactionDescription(this: IExecuteFunctions) {
	const mykoboCredentials = new MykoboCredentials(await this.getCredentials('mykoboApi'));
	const id = this.getNodeParameter('id', 0) as string;
	const showOptionalValues = this.getNodeParameter('showOptionalValues', 0) as boolean;

	const sep31 = new SEP31(mykoboCredentials, '');

	let paymentRequest: IGetTransactionRequest;

	if (!showOptionalValues) {
		paymentRequest = { id };
	} else {
		const accountId = this?.getNodeParameter('accountId', 0) as string;
		const memoType = this?.getNodeParameter('memoType', 0) as string;
		const memo = this?.getNodeParameter('memo', 0) as string;

		paymentRequest = {
			id,
			accountId,
			memoType,
			memo,
		};
	}
	return await sep31.getTransactionById(paymentRequest as IGetTransactionRequest);
}
