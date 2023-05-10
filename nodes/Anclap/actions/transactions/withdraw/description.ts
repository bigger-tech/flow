import { INodeProperties } from 'n8n-workflow';

export const withdrawDescription: INodeProperties[] = [
	{
		displayName: 'Token',
		name: 'token',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['withdraw'],
			},
		},
		default: '',
	},
	{
		displayName: 'Asset Code',
		name: 'assetCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['withdraw'],
			},
		},
		default: '',
		placeholder: 'ARS',
	},
	{
		displayName: 'Public Key',
		name: 'publicKey',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['withdraw'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
	},
];
