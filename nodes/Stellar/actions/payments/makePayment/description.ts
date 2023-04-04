import { INodeProperties } from 'n8n-workflow';

export const makePaymentDescription: INodeProperties[] = [
	{
		displayName: 'Destination Account',
		name: 'destinationAccount',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['makePayment'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account public key',
	},
	{
		displayName: 'Asset Type',
		name: 'isNative',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['makePayment'],
			},
		},
		options: [
			{
				name: 'Native',
				value: true,
			},
			{
				name: 'Custom Asset',
				value: false,
			},
		],
		default: true,
	},
	{
		displayName: 'Destination Asset',
		name: 'destinationAsset',
		type: 'fixedCollection',
		default: {},
		required: true,
		options: [
			{
				name: 'values',
				displayName: 'Asset',
				values: [
					{
						displayName: 'Code',
						name: 'code',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Issuer',
						name: 'issuer',
						type: 'string',
						default: '',
						placeholder: 'GCEVJ...',
					},
				],
			},
		],
		displayOptions: {
			show: {
				isNative: [false],
			},
		},
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['makePayment'],
			},
		},
		default: '',
		description: 'Amount to be transfer',
	},
	{
		displayName: 'Source Account',
		name: 'sourceAccount',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['makePayment'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account public key',
	},
];
