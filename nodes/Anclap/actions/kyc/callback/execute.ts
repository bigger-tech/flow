import { IExecuteFunctions } from 'n8n-workflow';
import AnchorCredentials from '../../../../../common/repository/anchor/AnchorCredentials';
import SEP12 from '../../../../../common/repository/anchor/SEP12';
import { ICallbackRequest } from '../../../../../common/requests/anchor/KYCRequest/ICallbackRequest';
import CallbackRequest from '../../../../../common/requests/anchor/KYCRequest/CallbackRequest';

export async function setCallbackUrl(this: IExecuteFunctions) {
	const anclapCredentials = new AnchorCredentials(await this.getCredentials('anclapApi'));
	const token = this.getNodeParameter('token', 0) as string;

	const url = this.getNodeParameter('url', 0) as string;

	const showOptionalValues = this.getNodeParameter('showOptionalValues', 0) as boolean;

	const sep12 = new SEP12(anclapCredentials, token);

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
