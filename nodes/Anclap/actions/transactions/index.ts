import { INodeProperties } from 'n8n-workflow';
import * as deposit from './deposit';
import * as withdraw from './withdraw';
export { deposit, withdraw };

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'deposit',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
			},
		},
		options: [
			{
				name: 'Get Deposit',
				value: 'deposit',
				action: 'Get deposit interactive URL',
			},
			{
				name: 'Get Withdraw',
				value: 'withdraw',
				action: 'Get withdraw interactive URL',
			},
		],
	},
	...deposit.description,
	...withdraw.description,
];
