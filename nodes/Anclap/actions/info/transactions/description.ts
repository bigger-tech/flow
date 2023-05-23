import { INodeProperties } from 'n8n-workflow';

export const transactionsDescription: INodeProperties[] = [
	{
		displayName: 'Token',
		name: 'token',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['info'],
				operation: ['transactions'],
			},
		},
		default: '',
	},
	{
		displayName: 'Asset Code',
		name: 'assetCode',
		type: 'options',
		required: true,
		options: [
			{
				name: 'ARS',
				value: 'ARS',
			},
		],
		displayOptions: {
			show: {
				resource: ['info'],
				operation: ['transactions'],
			},
		},
		default: 'ARS',
	},
	{
		displayName: 'Public Key',
		name: 'publicKey',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['info'],
				operation: ['transactions'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
	},
];
