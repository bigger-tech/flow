import { INodeProperties } from 'n8n-workflow';

export const swapAssetsDescription: INodeProperties[] = [
	{
		displayName: 'Public Key',
		name: 'publicKey',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['swapAssets'],
				operation: ['swap'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account public key',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['swap'],
				resource: ['swapAssets'],
			},
		},
		default: '',
		placeholder: '100',
	},
	{
		displayName: 'Slippage',
		name: 'slippage',
		type: 'collection',
		placeholder: 'Select slippage tolerance',
		required: true,
		default: {},
		options: [
			{
				displayName: 'Amount',
				name: 'amount',
				type: 'options',
				options: [
					{
						name: '0.1%',
						value: '0.1',
					},
					{
						name: '1.0%',
						value: '1.0',
					},
					{
						name: '2.0%',
						value: '2.0',
					},
				],
				default: '0.1',
			},
		],
		displayOptions: {
			show: {
				resource: ['swapAssets'],
				operation: ['swap'],
			},
		},
	},
	{
		displayName: 'Source Asset',
		name: 'sourceAsset',
		type: 'fixedCollection',
		required: true,
		options: [
			{
				name: 'values',
				displayName: 'Values',
				values: [
					{
						displayName: 'Code',
						name: 'code',
						type: 'string',
						default: 'native',
					},
					{
						displayName: 'Issuer',
						name: 'issuer',
						type: 'string',
						default: 'native',
					},
				],
			},
		],
		displayOptions: {
			show: {
				operation: ['swap'],
				resource: ['swapAssets'],
			},
		},
		default: {},
	},
	{
		displayName: 'Destination Asset',
		name: 'destinationAsset',
		type: 'fixedCollection',
		required: true,
		options: [
			{
				name: 'values',
				displayName: 'Values',
				values: [
					{
						displayName: 'Code',
						name: 'code',
						type: 'string',
						default: 'native',
					},
					{
						displayName: 'Issuer',
						name: 'issuer',
						type: 'string',
						default: 'native',
					},
				],
			},
		],
		displayOptions: {
			show: {
				operation: ['swap'],
				resource: ['swapAssets'],
			},
		},
		default: {},
	},
];
