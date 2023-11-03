import { IExecuteFunctions } from 'n8n-workflow';
import AnchorCredentials from '../../../../../common/repository/anchor/AnchorCredentials';
import SEP12 from '../../../../../common/repository/anchor/SEP12';
import KYCDeleteRequest from '../../../../../common/requests/anchor/KYCRequest/KYCDeleteRequest';

export async function deleteKYCInformation(this: IExecuteFunctions) {
	const mykoboCredentials = new AnchorCredentials(await this.getCredentials('mykoboApi'));
	const token = this.getNodeParameter('token', 0) as string;

	const sep12 = new SEP12(mykoboCredentials, token);

	const showOptionalValues = this.getNodeParameter('showOptionalValues', 0) as boolean;

	if (showOptionalValues) {
		const memo = this.getNodeParameter('memo', 0) as string;
		const memoType = this.getNodeParameter('memoType', 0) as string;

		const deleteRequest = new KYCDeleteRequest({
			memo,
			memoType,
		});
		return await sep12.deleteKYCInformation(deleteRequest);
	}

	return await sep12.deleteKYCInformation();
}
