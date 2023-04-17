import { INodeProperties } from 'n8n-workflow';

export const claimClaimableBalanceDescription: INodeProperties[] = [
	{
		displayName: 'Claimable Balance ID',
		name: 'balanceId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['claimableBalance'],
				operation: ['claimClaimableBalance'],
			},
		},
		default: '',
		description: 'The BalanceID on the ClaimableBalanceEntry that the source account is claiming',
	},
	{
		displayName: 'Source Account',
		name: 'sourceAccount',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['claimableBalance'],
				operation: ['claimClaimableBalance'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account public key',
	},
];