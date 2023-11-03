import { INodeProperties } from 'n8n-workflow';
import { description as statusDescription } from './status';
import { description as deleteDescription } from './delete';

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
				name: 'Delete KYC Information',
				value: 'deleteKYCInformation',
				action: 'Delete kyc information',
			},
		],
	},
	...statusDescription,
	...deleteDescription,
];

export default description;
