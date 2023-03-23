import { INodeProperties } from 'n8n-workflow';
import * as getPayment from './getPayment';

export { getPayment };

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'getPayment',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['payments'],
			},
		},
		options: [
			{
				name: 'Get Payment',
				value: 'getPayment',
				description: 'Get last payment',
				action: 'Get last payment',
			},
		],
	},
	...getPayment.description,
];
