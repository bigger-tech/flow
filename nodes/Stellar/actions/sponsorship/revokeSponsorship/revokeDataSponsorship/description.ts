import { INodeProperties } from 'n8n-workflow';

export const revokeDataSponsorshipDescription: INodeProperties[] = [
	{
		displayName: 'Account',
		name: 'Account',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sponsorship'],
				operation: ['revokeSponsorship'],
				revokeSponsorshipType: ['revokeDataSponsorship'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sponsorship'],
				operation: ['revokeSponsorship'],
				revokeSponsorshipType: ['revokeDataSponsorship'],
			},
		},
		default: '',
	},
];
