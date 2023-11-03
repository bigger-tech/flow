import { IExecuteFunctions } from 'n8n-workflow';
import AnchorCredentials from '../../../../../common/repository/anchor/AnchorCredentials';
import SEP12 from '../../../../../common/repository/anchor/SEP12';
import FilesRequest from '../../../../../common/requests/anchor/KYCRequest/FilesRequest';

export async function getFiles(this: IExecuteFunctions) {
	const anclapCredentials = new AnchorCredentials(await this.getCredentials('anclapApi'));
	const token = this.getNodeParameter('token', 0) as string;

	const sep12 = new SEP12(anclapCredentials, token);

	const showOptionalValues = this.getNodeParameter('showOptionalValues', 0) as boolean;

	if (showOptionalValues) {
		const fileId = this.getNodeParameter('fileId', 0) as string;
		const customerId = this.getNodeParameter('customerId', 0) as string;

		const filesRequest = new FilesRequest({
			fileId,
			customerId,
		});
		return await sep12.getFiles(filesRequest);
	}

	return await sep12.getFiles();
}
