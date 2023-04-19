import { INodeProperties } from 'n8n-workflow';

export const beginSponsoringDescription: INodeProperties[] = [
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
	{
		displayName: 'Source Account',
		name: 'sourceAccount',
		type: 'string',
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
