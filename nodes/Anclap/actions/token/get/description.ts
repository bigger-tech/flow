import { INodeProperties } from 'n8n-workflow';

export const getChallengeDescription: INodeProperties[] = [
	{
		displayName: 'Public Key',
		name: 'publicKey',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['token'],
				operation: ['get'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
	},
];
