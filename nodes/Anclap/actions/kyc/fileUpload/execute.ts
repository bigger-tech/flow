import { IExecuteFunctions } from 'n8n-workflow';
import AnchorCredentials from '../../../../../common/repository/anchor/AnchorCredentials';
import SEP12 from '../../../../../common/repository/anchor/SEP12';
import BinaryFieldRequest from '../../../../../common/requests/anchor/KYCRequest/BinaryFieldRequest';

export async function uploadBinaryFile(this: IExecuteFunctions) {
	const anclapCredentials = new AnchorCredentials(await this.getCredentials('anclapApi'));
	const token = this.getNodeParameter('token', 0) as string;

	const sep12 = new SEP12(anclapCredentials, token);

	const file = this.getNodeParameter('file', 0) as string;

	const binaryFieldRequest = new BinaryFieldRequest({ file });

	return await sep12.uploadBinaryFile(binaryFieldRequest);
}
