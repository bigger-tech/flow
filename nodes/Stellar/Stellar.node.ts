import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import * as newAccount from './actions/newAccount';
import * as payments from './actions/payments';
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
						name: 'New Account',
						value: 'newAccount',
					},
					{
						name: 'Payment',
						value: 'payments',
					},
					{
						name: 'Account Option',
						value: 'options',
					},
					{
						name: 'Offer',
						value: 'offers',
					},
				],
				noDataExpression: true,
				required: true,
				description: 'Operation Type:',
			},
			...newAccount.description,
			...payments.description,
		],
	};
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		return router.call(this);
	}
}
