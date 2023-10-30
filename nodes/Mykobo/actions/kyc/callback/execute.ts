import { IExecuteFunctions } from 'n8n-workflow';
import MykoboCredentials from '../../../transport/MykoboCredentials';
import SEP12 from '../../../transport/SEP12';
import { ICallbackRequest } from '../../../transport/requests/KYCRequest/ICallbackRequest';
import CallbackRequest from '../../../transport/requests/KYCRequest/CallbackRequest';

export async function setCallbackUrl(this: IExecuteFunctions) {
	const mykoboCredentials = new MykoboCredentials(await this.getCredentials('mykoboApi'));
	const token = this.getNodeParameter('token', 0) as string;

	const url = this.getNodeParameter('url', 0) as string;

	const showOptionalValues = this.getNodeParameter('showOptionalValues', 0) as boolean;

	const sep12 = new SEP12(mykoboCredentials, token);

	let callbackRequest: ICallbackRequest;

	if (showOptionalValues) {
		const id = this.getNodeParameter('id', 0) as string;
		const memo = this.getNodeParameter('memo', 0) as string;
		const memoType = this.getNodeParameter('memoType', 0) as string;

		callbackRequest = new CallbackRequest({
			id,
			memo,
			memoType,
			url,
		});
	} else {
		callbackRequest = new CallbackRequest({ url });
	}

	return await sep12.setCallbackUrl(callbackRequest);
}
