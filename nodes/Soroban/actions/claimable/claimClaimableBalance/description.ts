import { ClaimableBalanceProperties } from '../../entities/SorobanNode';

export const claimClaimableBalanceDescription: ClaimableBalanceProperties = [
	{
		displayName: 'Claimable Balance ID',
		name: 'balanceId',
		type: 'string',
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
		displayName: 'Transaction XDR',
		name: 'transaction',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['claimableBalance'],
				operation: ['claimClaimableBalance'],
			},
		},
		default: '',
		description: 'The transaction that the source account used to create the ClaimableBalanceEntry',
	},
];
