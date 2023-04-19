import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import * as newAccount from './actions/newAccount';
import * as payments from './actions/payments';
import * as offers from './actions/offers';
import * as swapAssets from './actions/swapAssets';
import * as transaction from './actions/transaction';
import * as claimable from './actions/claimable';
import * as accountMerge from './actions/accountMerge';
import * as sponsorship from './actions/sponsorship';
import * as settings from './actions/settings';
import * as trust from './actions/trust';
import * as clawback from './actions/clawback/';
import * as liquidityPool from './actions/liquidityPool';
import { router } from './actions/router';

export class Stellar implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Stellar',
		name: 'stellar',
		icon: 'file:stellar.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{ $parameter["operation"] }}',
		description: 'Create Stellar Account',
		defaults: {
			name: 'Stellar',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'stellarNetworkApi', required: true }],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				default: 'newAccount',
				options: [
					{
						name: 'Account Merge',
						value: 'accountMerge',
					},
					{
						name: 'Account Setting',
						value: 'settings',
					},
					{
						name: 'Claimable Balance',
						value: 'claimableBalance',
					},
					{
						name: 'Clawback',
						value: 'clawback',
					},
					{
						name: 'Liquidity Pool',
						value: 'liquidityPool',
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
						name: 'Payment',
						value: 'payments',
					},
					{
						name: 'Sponsorship',
						value: 'sponsorship',
					},
					{
						name: 'Swap Asset',
						value: 'swapAssets',
					},
					{
						name: 'Transaction',
						value: 'transaction',
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
			...newAccount.description,
			...payments.description,
			...offers.description,
			...swapAssets.description,
			...transaction.description,
			...claimable.description,
			...accountMerge.description,
			...clawback.description,
			...settings.description,
			...sponsorship.description,
			...trust.description,
			...liquidityPool.description,
		],
	};
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		return router.call(this);
	}
}
