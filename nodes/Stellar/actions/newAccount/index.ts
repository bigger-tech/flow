import { INodeProperties } from 'n8n-workflow';
import * as createAccount from './createAccount';
import * as fundAccount from './fundAccount';

export { createAccount, fundAccount };

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
			{
				name: 'Fund Account with Friendbot',
				value: 'fundAccount',
				description: 'Get testnet lumens',
				action: 'Fund account in testnet',
			},
		],
	},
];
