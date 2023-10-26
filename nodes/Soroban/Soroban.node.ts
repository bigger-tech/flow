import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { router } from './actions/router';
import * as claimable from './actions/claimable';
import * as payments from './actions/payments';
import * as newAccount from './actions/newAccount';
import * as transaction from './actions/transaction';
import * as fundAccount from './actions/fundAccount';
import * as clawback from './actions/clawback';
import * as trust from './actions/trust';
import * as liquidityPool from './actions/liquidityPool';
export class Soroban implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Soroban',
		name: 'soroban',
		icon: 'file:soroban.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{ $parameter["operation"] }}',
		description: 'Create Soroban Account',
		defaults: {
			name: 'Soroban',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'sorobanNetworkApi', required: true }],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				default: 'transaction',
				options: [
					{
						name: 'Claimable Balance',
						value: 'claimableBalance',
					},
					{
						name: 'Payment',
						value: 'payments',
					},
					{
						name: 'New Account',
						value: 'newAccount',
					},
					{
						name: 'Fund Account in futurenet',
						value: 'fundAccount',
					},
					{
						name: 'Liquidity Pool',
						value: 'liquidityPool',
					},
					{
						name: 'Transaction',
						value: 'transaction',
					},
					{
						name: 'Clawback',
						value: 'clawback',
					},
					{
						name: 'Trust',
						value: 'trust',
					},
				],
				noDataExpression: true,
				required: true,
				description: 'Operation Type:',
			},
			...claimable.description,
			...payments.description,
			...newAccount.description,
			...fundAccount.description,
			...liquidityPool.description,
			...transaction.description,
			...clawback.description,
			...trust.description,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		return router.call(this);
	}
}
