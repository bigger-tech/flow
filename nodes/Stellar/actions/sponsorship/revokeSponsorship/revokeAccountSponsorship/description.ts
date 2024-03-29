import { SponsorshipProperties } from '../../../entities/StellarNode';

export const revokeAccountSponsorshipDescription: SponsorshipProperties = [
	{
		displayName: 'Account',
		name: 'account',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sponsorship'],
				operation: ['revokeSponsorship'],
				revokeSponsorshipType: ['revokeAccountSponsorship'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
	},
];
