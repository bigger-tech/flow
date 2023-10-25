import { SponsorshipProperties } from '../../entities/StellarNode';

export const beginSponsoringDescription: SponsorshipProperties = [
	{
		displayName: 'Sponsored ID',
		name: 'sponsoredId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sponsorship'],
				operation: ['beginSponsoring'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account public key',
	},
];
