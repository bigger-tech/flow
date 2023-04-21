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
		displayName: 'Source Asset Type',
		name: 'isSourceAssetNative',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['swapAssets'],
				operation: ['swap'],
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
		displayName: 'Source Asset',
		name: 'sourceAsset',
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
				resource: ['swapAssets'],
				operation: ['swap'],
				isSourceAssetNative: [false],
			},
		},
	},
	{
		displayName: 'Destination Asset Type',
		name: 'isDestinationAssetNative',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['swapAssets'],
				operation: ['swap'],
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
				resource: ['swapAssets'],
				operation: ['swap'],
				isDestinationAssetNative: [false],
			},
		},
	},
];
