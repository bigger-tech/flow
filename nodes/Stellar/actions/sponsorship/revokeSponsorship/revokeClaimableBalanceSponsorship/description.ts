import { INodeProperties } from 'n8n-workflow';

export const revokeClaimableBalanceSponsorshipDescription: INodeProperties[] = [
	{
		displayName: 'Claimable Balance ID',
		name: 'balanceId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sponsorship'],
				operation: ['revokeSponsorship'],
				revokeSponsorshipType: ['revokeClaimableBalanceSponsorship'],
			},
		},
		default: '',
	},
];
