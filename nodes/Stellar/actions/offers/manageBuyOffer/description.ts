import { INodeProperties } from 'n8n-workflow';

export const manageBuyOfferDescription: INodeProperties[] = [
	{
		displayName: 'Selling',
		name: 'isSellingAssetNative',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['offers'],
				operation: ['manageBuyOffer'],
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
				operation: ['manageBuyOffer'],
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
		displayName: 'Amount You Are Buying',
		name: 'buyingAmount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['offers'],
				operation: ['manageBuyOffer'],
			},
		},
		default: '',
		description: 'An amount of zero will delete the offer',
	},
	{
		displayName: 'Price of 1 Unit of Buying in Terms of Selling',
		name: 'price',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['offers'],
				operation: ['manageBuyOffer'],
			},
		},
		default: '',
	},
	{
		displayName: 'Offer ID',
		name: 'offerId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['offers'],
				operation: ['manageBuyOffer'],
			},
		},
		description:
			'If 0, will create a new offer. Existing offer ID numbers can be found using the Offers for Account endpoint.',
		default: 0,
	},

	{
		displayName: 'Source Account',
		name: 'sourceAccount',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['offers'],
				operation: ['manageBuyOffer'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account public key',
	},
];
