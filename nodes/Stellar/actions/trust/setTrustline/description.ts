import { INodeProperties } from 'n8n-workflow';

export const setTrustlineDescription: INodeProperties[] = [
	{
		displayName: 'Trustor',
		name: 'trustor',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['trust'],
				operation: ['setTrustline'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account public key',
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
				resource: ['trust'],
				operation: ['setTrustline'],
			},
		},
	},
	{
		displayName: 'Authorized',
		name: 'authorized',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['trust'],
				operation: ['setTrustline'],
			},
		},
		default: true,
		description: 'Whether the trustor is authorized to transact with the asset or not',
	},
	{
		displayName: 'Authorized To Maintain Liabilities',
		name: 'authorizedToMaintainLiabilities',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['trust'],
				operation: ['setTrustline'],
			},
		},
		default: false,
		description:
			'Whether he trustor is authorized to maintain offers but not to perform other transactions',
	},
	{
		displayName: 'Clawback Enabled',
		name: 'clawbackEnabled',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['trust'],
				operation: ['setTrustline'],
			},
		},
		default: true,
		description:
			'Whether the issuer will be allowed to clawback its asset (both from accounts and claimable balances)',
	},
	{
		displayName: 'Source Account',
		name: 'sourceAccount',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['trust'],
				operation: ['setTrustline'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account public key',
	},
];
