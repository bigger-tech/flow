import { SponsorshipProperties } from '../../../entities/StellarNode';

export const revokeClaimableBalanceSponsorshipDescription: SponsorshipProperties = [
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
