import { TrustProperties } from '../../entities/IStellarNode';

export const changeTrustDescription: TrustProperties = [
	{
		displayName: 'Asset Type',
		name: 'assetType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['trust'],
				operation: ['changeTrust'],
			},
		},
		options: [
			{
				name: 'Custom Asset',
				value: 'asset',
			},
			{
				name: 'Liquidity Pool Shares',
				value: 'liquidityPool',
			},
		],
		default: 'asset',
	},
	{
		displayName: 'Asset',
		name: 'asset',
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
				assetType: ['asset'],
			},
		},
	},
	{
		displayName: 'Asset A',
		name: 'isAssetANative',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				assetType: ['liquidityPool'],
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
		displayName: 'Asset A',
		name: 'assetA',
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
				assetType: ['liquidityPool'],
				isAssetANative: [false],
			},
		},
	},
	{
		displayName: 'Asset B',
		name: 'isAssetBNative',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				assetType: ['liquidityPool'],
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
		displayName: 'Asset B',
		name: 'asset B',
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
				assetType: ['liquidityPool'],
				isAssetBNative: [false],
			},
		},
	},
	{
		displayName: 'Fee',
		name: 'fee',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				assetType: ['liquidityPool'],
			},
		},
		default: '',
		description: 'For now the only fee supported is 30',
	},
	{
		displayName: 'Trust Limit',
		name: 'trustLimit',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['trust'],
				operation: ['changeTrust'],
			},
		},
		default: '',
		description: 'Leave empty to default to the max int64. Set to 0 to remove the trust line.',
	},

	{
		displayName: 'Source Account',
		name: 'sourceAccount',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['trust'],
				operation: ['changeTrust'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account public key',
	},
];
