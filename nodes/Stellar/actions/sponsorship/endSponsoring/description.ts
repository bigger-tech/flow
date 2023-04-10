import { INodeProperties } from 'n8n-workflow';

export const endSponsoringDescription: INodeProperties[] = [
	{
		displayName: 'Account Sponsoring',
		name: 'accountSponsoring',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sponsorship'],
				operation: ['endSponsoring'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'The ID of the account which initiated the sponsorship',
	},
];
