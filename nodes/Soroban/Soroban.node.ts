import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { router } from './actions/router';
import * as accountMerge from './actions/accountMerge';
import * as claimable from './actions/claimable';
import * as settings from './actions/settings';
import * as payments from './actions/payments';
import * as newAccount from './actions/newAccount';
import * as transaction from './actions/transaction';
import * as fundAccount from './actions/fundAccount';
import * as sponsorship from './actions/sponsorship';
import * as clawback from './actions/clawback';
import * as trust from './actions/trust';
import * as swapAssets from './actions/swapAssets';
import * as offers from './actions/offers';
import * as liquidityPool from './actions/liquidityPool';
import * as server from './actions/server';
import * as contract from './actions/contract';

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
						name: 'Account Merge',
						value: 'accountMerge',
					},
					{
						name: 'Claimable Balance',
						value: 'claimableBalance',
					},
					{
						name: 'Account Setting',
						value: 'settings',
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
						name: 'Offer',
						value: 'offers',
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
						name: 'Server',
						value: 'server',
					},
					{
						name: 'Transaction',
						value: 'transaction',
					},
					{
						name: 'Sponsorship',
						value: 'sponsorship',
					},
					{
						name: 'Clawback',
						value: 'clawback',
					},
					{
						name: 'Trust',
						value: 'trust',
					},
					{
						name: 'Swap Asset',
						value: 'swapAssets',
					},
					{
						name: 'Contract',
						value: 'contract',
					},
				],
				noDataExpression: true,
				required: true,
				description: 'Operation Type:',
			},
			...server.description,
			...accountMerge.description,
			...claimable.description,
			...settings.description,
			...payments.description,
			...newAccount.description,
			...offers.description,
			...fundAccount.description,
			...liquidityPool.description,
			...transaction.description,
			...sponsorship.description,
			...clawback.description,
			...trust.description,
			...swapAssets.description,
			...contract.description,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		return router.call(this);
	}
}
