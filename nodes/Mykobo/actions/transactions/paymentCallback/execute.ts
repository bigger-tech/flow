import { IExecuteFunctions } from 'n8n-workflow';
import MykoboCredentials from '../../../transport/MykoboCredentials';
import SEP31 from '../../../transport/SEP31';
import ICallbackRequest from '../../../transport/requests/DirectPaymentRequest/ICallbackRequest';

export async function setCallbackUrl(this: IExecuteFunctions) {
	const mykoboCredentials = new MykoboCredentials(await this.getCredentials('mykoboApi'));
	const token = this.getNodeParameter('token', 0) as string;
	const url = this.getNodeParameter('url', 0) as string;
	const id = this.getNodeParameter('id', 0) as string;

	const sep31 = new SEP31(mykoboCredentials, token);

	const callbackRequest: ICallbackRequest = {
		url,
		id,
	};

	return await sep31.setCallbackUrl(callbackRequest);
}
