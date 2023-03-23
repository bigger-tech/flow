import { INodeProperties } from 'n8n-workflow';

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
