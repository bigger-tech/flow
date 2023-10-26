import { ClawbackProperties } from '../../entities/SorobanNode';

export const clawbackClaimableBalanceDescription: ClawbackProperties = [
	{
		displayName: 'Claimable Balance ID',
		name: 'balanceId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['clawback'],
				operation: ['clawbackClaimableBalance'],
			},
		},
		default: '',
		description: 'The BalanceID on the ClaimableBalanceEntry that the source account is claiming',
	},
	{
		displayName: 'Transaction XDR',
		name: 'transaction',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['clawback'],
				operation: ['clawbackClaimableBalance'],
			},
		},
		default: '',
		description: 'The transaction that the source account used to create the ClaimableBalanceEntry',
	},
];
