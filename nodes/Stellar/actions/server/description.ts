import { INodeProperties } from 'n8n-workflow';
import * as checkLiquidityPool from './checkLiquidityPool';
import * as checkLastPayments from './checkLastPayments';
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
				name: 'Check Last Payments',
				value: 'checkLastPayments',
				action: 'Check last payments',
			},
		],
	},
	...checkLastPayments.description,
	...checkLiquidityPool.description,
];

export default description;
