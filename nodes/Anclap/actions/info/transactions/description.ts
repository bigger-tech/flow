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
		displayName: 'Transaction Type',
		name: 'transactionType',
		type: 'options',
		required: true,
		options: [
			{
				name: 'Default',
				value: 'default',
			},
			{
				name: 'Withdraw',
				value: 'withdrawal',
			},
			{
				name: 'Deposit',
				value: 'deposit',
			},
		],
		displayOptions: {
			show: {
				resource: ['info'],
				operation: ['transactions'],
			},
		},
		default: 'default',
	},
	{
		displayName: 'Protocol',
		name: 'protocol',
		type: 'options',
		required: true,
		options: [
			{
				name: 'SEP24',
				value: 'sep24',
			},
			{
				name: 'SEP6',
				value: 'sep6',
			},
		],
		displayOptions: {
			show: {
				resource: ['info'],
				operation: ['transactions'],
			},
		},
		default: 'sep24',
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
