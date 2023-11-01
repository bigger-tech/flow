import { INodeProperties } from 'n8n-workflow';

export const callbackDescription: INodeProperties[] = [
	{
		displayName: 'Token',
		name: 'token',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['paymentCallback'],
			},
		},
		default: '',
	},
	{
		displayName: 'Transaction ID',
		name: 'id',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['paymentCallback'],
			},
		},
		default: '',
		placeholder: '',
		description: 'The ID of the transaction',
	},
	{
		displayName: 'Callback URL',
		name: 'url',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['paymentCallback'],
			},
		},
		default: '',
		placeholder: '',
		description:
			'A valid URL that can accept POST requests containing the transaction obejct defined in the response to GET /transaction/:ID',
	},
];
