import { INodeProperties } from 'n8n-workflow';

export const depositInteractiveDescription: INodeProperties[] = [
	{
		displayName: 'Token',
		name: 'token',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['depositInteractive'],
			},
		},
		default: '',
	},
	{
		displayName: 'Asset Code',
		name: 'assetCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['depositInteractive'],
			},
		},
		default: 'ARS',
		description: 'The code of the on-chain asset the user wants to get from the Anchor after doing an off-chain deposit.'
	}
];
