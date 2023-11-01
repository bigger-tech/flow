import { TrustProperties } from '../../entities/SorobanNode';

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
		],
		default: 'asset',
	},
	{
		displayName: 'Asset',
		name: 'trustAsset',
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
		displayName: 'Trust Limit',
		name: 'trustLimit',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['trust'],
				operation: ['changeTrust'],
			},
		},
		default: '',
		description: 'Leave empty to default to the max int64. Set to 0 to remove the trust line.',
	},
];
