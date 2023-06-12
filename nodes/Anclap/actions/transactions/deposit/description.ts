import { INodeProperties } from 'n8n-workflow';

export const depositDescription: INodeProperties[] = [
	{
		displayName: 'Token',
		name: 'token',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['deposit'],
			},
		},
		default: '',
	},
	{
		displayName: 'Get Interactive URL',
		name: 'isInteractive',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['deposit'],
			},
		},
		default: true,
		description:
			'Whether to get an interactive URL to do the transaction or do it manually ("manually" requires the user to be registered in Anclap)',
	},
	{
		displayName: 'Asset Code',
		name: 'assetCode',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['deposit'],
			},
		},
		options: [
			{
				name: 'ARS',
				value: 'ARS',
			},
		],
		default: 'ARS',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				isInteractive: [false],
				resource: ['transactions'],
				operation: ['deposit'],
			},
		},
		default: '',
	},
];
