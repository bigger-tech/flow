import { FundAccountProperties } from '../entities/IStellarNode';
import * as fundAccount from './fundAccount';

export { fundAccount };

export const description: FundAccountProperties = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'fundAccount',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['fundAccount'],
			},
		},
		options: [
			{
				name: 'Fund Account with Friendbot',
				value: 'fundAccount',
				description: 'Get testnet lumens',
				action: 'Fund account in testnet',
			},
		],
	},
];
