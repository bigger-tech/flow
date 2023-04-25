import { INodeProperties } from 'n8n-workflow';

export const pathPaymentStrictSendDescription: INodeProperties[] = [
	{
		displayName: 'Destination Account',
		name: 'destinationAccount',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['pathPaymentStrictSend'],
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
				operation: ['pathPaymentStrictSend'],
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
				isSendingAssetNative: [false],
			},
		},
	},
	{
		displayName: 'Send Amount',
		name: 'sendAmount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['pathPaymentStrictSend'],
			},
		},
		default: '',
		description: 'Amount to be transfer',
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
				operation: ['pathPaymentStrictSend'],
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
						name: 'values',
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
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['pathPaymentStrictSend'],
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
				resource: ['payments'],
				operation: ['pathPaymentStrictSend'],
				isDestinationAssetNative: [false],
			},
		},
	},
	{
		displayName: 'Minimum Destination Amount',
		name: 'minDestinationAmount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['pathPaymentStrictSend'],
			},
		},
		default: '',
		description: 'The minimum amount the destination can receive',
	},
	{
		displayName: 'Source Account',
		name: 'sourceAccount',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['pathPaymentStrictSend'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account public key',
	},
];
