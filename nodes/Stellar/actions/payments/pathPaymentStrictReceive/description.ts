import { INodeProperties } from 'n8n-workflow';

export const pathPaymentStrictReceiveDescription: INodeProperties[] = [
	{
		displayName: 'Destination Account',
		name: 'destinationAccount',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['pathPaymentStrictReceive'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account public key',
	},
	{
		displayName: 'Sending Asset',
		name: 'isSendingAssetNative',
		type: 'options',
		description: "The asset to be deduced from the sender's account",
		required: true,
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['pathPaymentStrictReceive'],
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
		displayName: 'Sending Asset',
		name: 'sendingAsset',
		type: 'fixedCollection',
		default: {},
		required: true,
		options: [
			{
				name: 'sendingAsset',
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
				isSendingAssetNative: [false],
			},
		},
	},
	{
		displayName: 'Maximum Send Amount',
		name: 'maxSendAmount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['pathPaymentStrictReceive'],
			},
		},
		default: '',
		description:
			'The most the sender is willing to spend to take the paths to. Resulting amount may vary due to the offers in the orderbook.',
	},
	{
		displayName: 'Intermediate Path',
		name: 'intermediatePathAssets',
		type: 'collection',
		typeOptions: {
			multipleValues: true,
			multipleValueButtonText: 'Add new intermediate asset',
		},
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['pathPaymentStrictReceive'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Native asset',
				name: 'native',
				type: 'notice',
				default: true,
				value: 'native',
			},
			{
				displayName: 'Custom Asset',
				name: 'customAsset',
				type: 'fixedCollection',
				default: {},
				required: true,
				options: [
					{
						name: 'asset',
						displayName: 'Intermediate Asset',
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
			},
		],
	},

	{
		displayName: 'Destination Asset',
		name: 'isDestinationAssetNative',
		description: 'The asset to be received by the destination account',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['pathPaymentStrictReceive'],
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
		options: [
			{
				name: 'destinationAsset',
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
				isDestinationAssetNative: [false],
			},
		},
	},
	{
		displayName: 'Destination Amount',
		name: 'destinationAmount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['pathPaymentStrictReceive'],
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
				resource: ['payments'],
				operation: ['pathPaymentStrictReceive'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account public key',
	},
];
