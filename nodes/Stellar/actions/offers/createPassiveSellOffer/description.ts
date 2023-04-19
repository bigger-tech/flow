import { INodeProperties } from 'n8n-workflow';

export const createPassiveSellOfferDescription: INodeProperties[] = [
	{
		displayName: 'Selling',
		name: 'isSellingAssetNative',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['offers'],
				operation: ['createPassiveSellOffer'],
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
		displayName: 'Selling Asset',
		name: 'sellingAsset',
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
				isSellingAssetNative: [false],
			},
		},
	},
	{
		displayName: 'Buying',
		name: 'isBuyingAssetNative',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['offers'],
				operation: ['createPassiveSellOffer'],
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
		displayName: 'Buying Asset',
		name: 'buyingAsset',
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
				isBuyingAssetNative: [false],
			},
		},
	},
	{
		displayName: 'Amount You Are Selling',
		name: 'sellingAmount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['offers'],
				operation: ['createPassiveSellOffer'],
			},
		},
		default: '',
		description: 'An amount of zero will delete the offer',
	},
	{
		displayName: 'Price of 1 Unit of Selling in Terms of Buying',
		name: 'price',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['offers'],
				operation: ['createPassiveSellOffer'],
			},
		},
		default: '',
	},

	{
		displayName: 'Source Account',
		name: 'sourceAccount',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['offers'],
				operation: ['createPassiveSellOffer'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account public key',
	},
];
