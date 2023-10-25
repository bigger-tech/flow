import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { router } from './actions/router';
import * as payments from './actions/payments';
import * as transaction from './actions/transaction';

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
						name: 'Payment',
						value: 'payments',
					},
					{
						name: 'Transaction',
						value: 'transaction',
					},
				],
				noDataExpression: true,
				required: true,
				description: 'Operation Type:',
			},
			...payments.description,
			...transaction.description,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		return router.call(this);
	}
}
