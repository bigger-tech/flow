import { INodeProperties } from 'n8n-workflow';
import { description as statusDescription } from './status';
import { description as callbackDescription } from './callback';
import { description as registrationDescription } from './registration';
import { description as fileUploadDescription } from './fileUpload';
import { description as filesDescription } from './files';
import { description as binaryRegistrationDescription } from './binaryRegistration';
import { description as deleteDescription } from './delete';
import { description as verificationCodesDescription } from './verification';

const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'status',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['kyc'],
			},
		},
		options: [
			{
				name: 'Get Status',
				value: 'status',
				action: 'Get status',
			},
			{
				name: 'Set Callback URL',
				value: 'callback',
				action: 'Set callback url',
			},
			{
				name: 'Send KYC Information',
				value: 'registration',
				action: 'Send kyc information',
			},
			{
				name: 'Upload Binary File',
				value: 'fileUpload',
				action: 'Upload binary file',
			},
			{
				name: 'Get Files',
				value: 'files',
				action: 'Get files',
			},
			{
				name: 'Send Binary File IDs',
				value: 'binaryRegistration',
				action: 'Send binary file i ds',
			},
			{
				name: 'Delete KYC Information',
				value: 'deleteKYCInformation',
				action: 'Delete kyc information',
			},
			{
				name: 'Send Verification Code',
				value: 'verificationCodes',
				action: 'Send verification code',
			},
		],
	},
	...statusDescription,
	...callbackDescription,
	...registrationDescription,
	...fileUploadDescription,
	...filesDescription,
	...binaryRegistrationDescription,
	...deleteDescription,
	...verificationCodesDescription,
];

export default description;
