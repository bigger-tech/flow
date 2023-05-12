import { INodeProperties } from 'n8n-workflow';

export const manageSellOfferDescription: INodeProperties[] = [
	{
		displayName: 'Selling Asset',
		name: 'sellingAsset',
		type: 'fixedCollection',
		default: {},
		placeholder: 'Select asset',
		required: true,
		typeOptions: {
			multipleValues: false,
		},
		options: [
			{
				name: 'values',
				displayName: 'Asset',
				values: [
					{
						displayName: 'Asset Type',
						name: 'isNative',
						type: 'options',
						required: true,
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
						displayName: 'Code',
						name: 'code',
						type: 'string',
						default: '',
						required: true,
						displayOptions: {
							show: {
								isNative: [false],
							},
						},
					},
					{
						displayName: 'Issuer',
						name: 'issuer',
						type: 'string',
						default: '',
						required: true,
						placeholder: 'GCEVJ...',
						displayOptions: {
							show: {
								isNative: [false],
							},
						},
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['offers'],
				operation: ['manageSellOffer'],
			},
		},
		description: 'Asset the offer creator is selling',
	},
	{
		displayName: 'Buying Asset',
		name: 'buyingAsset',
		type: 'fixedCollection',
		default: {},
		required: true,
		placeholder: 'Select asset',
		typeOptions: {
			multipleValues: false,
		},
		options: [
			{
				name: 'values',
				displayName: 'Asset',
				values: [
					{
						displayName: 'Asset Type',
						name: 'isNative',
						type: 'options',
						required: true,

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
						displayName: 'Code',
						name: 'code',
						type: 'string',
						default: '',
						displayOptions: {
							show: {
								isNative: [false],
							},
						},
					},
					{
						displayName: 'Issuer',
						name: 'issuer',
						type: 'string',
						default: '',
						placeholder: 'GCEVJ...',
						displayOptions: {
							show: {
								isNative: [false],
							},
						},
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['offers'],
				operation: ['manageSellOffer'],
			},
		},
		description: 'Asset the offer creator is buying',
	},
	{
		displayName: 'Amount You Are Selling',
		name: 'sellingAmount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['offers'],
				operation: ['manageSellOffer'],
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
				operation: ['manageSellOffer'],
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
				operation: ['manageSellOffer'],
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
				operation: ['manageSellOffer'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account public key',
	},
];
