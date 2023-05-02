import { ClawbackProperties } from '../../entities/IStellarNode';

export const clawbackDescription: ClawbackProperties = [
	{
		displayName: 'Asset Type',
		name: 'isNative',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['clawback'],
				operation: ['clawback'],
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
		displayName: 'Asset',
		name: 'assetToBurn',
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
		description: 'Asset held by the destination account',
	},
	{
		displayName: 'From',
		name: 'from',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['clawback'],
				operation: ['clawback'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account address that receives the clawback',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['clawback'],
				operation: ['clawback'],
			},
		},
		default: '',
		description: 'Amount of the aforementioned asset to burn',
	},
	{
		displayName: 'Source Account',
		name: 'sourceAccount',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['clawback'],
				operation: ['clawback'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account public key',
	},
];
