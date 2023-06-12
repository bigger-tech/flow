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
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['withdraw'],
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
		displayName: 'Type',
		name: 'type',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				isInteractive: [false],
				resource: ['transactions'],
				operation: ['withdraw'],
			},
		},
		options: [
			{
				name: 'Bank Account',
				value: 'bank_account',
			},
		],
		default: 'bank_account',
	},
	{
		displayName: 'Dest',
		name: 'dest',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				isInteractive: [false],
				resource: ['transactions'],
				operation: ['withdraw'],
			},
		},
		default: '',
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
				operation: ['withdraw'],
			},
		},
		default: '',
	},
];
