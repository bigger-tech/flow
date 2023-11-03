import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import * as token from './actions/token';
import * as transactions from './actions/transactions';
import * as info from './actions/info';
import * as kyc from './actions/kyc';
import * as utils from './actions/utils';
import { router } from './actions/router';

export class Mykobo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Mykobo',
		name: 'mykobo',
		// eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
		icon: 'file:mykobo.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{ $parameter["operation"] }}',
		description: 'Mykobo Node',
		defaults: {
			name: 'Mykobo',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'mykoboApi', required: true }],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				default: 'token',
				options: [
					{
						name: 'Token',
						value: 'token',
					},
					{
						name: 'Transaction',
						value: 'transactions',
					},
					{
						name: 'Info',
						value: 'info',
					},
					{
						name: 'KYC',
						value: 'kyc',
					},
					{
						name: 'Util',
						value: 'utils',
					},
				],
				noDataExpression: true,
				required: true,
				description: 'Operation Type:',
			},
			...token.description,
			...transactions.description,
			...info.description,
			...kyc.description,
			...utils.description,
		],
	};
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		return router.call(this);
	}
}
