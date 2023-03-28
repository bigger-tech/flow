import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import * as newAccount from './actions/newAccount';
import * as payments from './actions/payments';
import * as swapAssets from './actions/swapAssets';
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
						name: 'Account Option',
						value: 'options',
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
						name: 'Swap Asset',
						value: 'swapAssets',
					},
				],
				noDataExpression: true,
				required: true,
				description: 'Operation Type:',
			},
			...newAccount.description,
			...payments.description,
			...swapAssets.description,
		],
	};
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		return router.call(this);
	}
}
