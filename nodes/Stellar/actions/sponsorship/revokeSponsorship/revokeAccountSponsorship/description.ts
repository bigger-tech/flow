import { INodeProperties } from 'n8n-workflow';

export const revokeAccountSponsorshipDescription: INodeProperties[] = [
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
