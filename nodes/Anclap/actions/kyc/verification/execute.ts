import { IExecuteFunctions } from 'n8n-workflow';
import SEP12 from '../../../../../common/repository/anchor/SEP12';
import AnchorCredentials from '../../../../../common/repository/anchor/AnchorCredentials';
import { IKYCVerification } from '../../../../../common/requests/anchor/KYCRequest/IKYCVerification';

export async function sendVerificationCodes(this: IExecuteFunctions) {
	const anclapCredentials = new AnchorCredentials(await this.getCredentials('anclapApi'));
	const token = this.getNodeParameter('token', 0) as string;

	const id = this.getNodeParameter('id', 0) as string;
	const mobileNumber = this.getNodeParameter('mobileNumber', 0) as string;
	const emailAddress = this.getNodeParameter('emailAddress', 0) as string;

	const sep12 = new SEP12(anclapCredentials, token);

	const verificationFields = {
		mobileNumber,
		emailAddress,
	};
	const verificationRequest = createVerificationRequest(id, verificationFields);

	return sep12.sendVerificationCodes(verificationRequest);
}

function createVerificationRequest(
	id: string,
	verificationFields: Record<string, string>,
): IKYCVerification {
	const verificationRequest: IKYCVerification = { id };

	for (const field in verificationFields) {
		if (verificationFields.hasOwnProperty(field)) {
			const verificationKey = `${field}Verification`;
			verificationRequest[verificationKey] = verificationFields[field];
		}
	}

	return verificationRequest;
}
