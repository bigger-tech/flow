import { INodeProperties } from 'n8n-workflow';
import * as createAccount from './createAccount';

export { createAccount };

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'createAccount',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['newAccount'],
			},
		},
		options: [
			{
				name: 'Create Account',
				value: 'createAccount',
				description: 'Create a new Stellar account',
				action: 'Create a new stellar account',
			},
		],
	},
];
