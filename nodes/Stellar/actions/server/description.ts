import { INodeProperties } from 'n8n-workflow';
import * as checkLiquidityPool from './checkLiquidityPool';
import * as checkPayments from './checkPayments';
const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'checkLiquidityPool',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['server'],
			},
		},
		options: [
			{
				name: 'Check Liquidity Pool',
				value: 'checkLiquidityPool',
				description: 'Check liquidity pools availables',
				action: 'Check liquidity pools availables',
			},
			{
				name: 'Check Payments',
				value: 'checkPayments',
				action: 'Check payments',
			},
		],
	},
	...checkPayments.description,
	...checkLiquidityPool.description,
];

export default description;
