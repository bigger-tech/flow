import { INodeProperties } from 'n8n-workflow';
import { transactionsDescription } from './transactions/description';

const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'transactions',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['info'],
			},
		},
		options: [
			{
				name: 'Get Transactions Info',
				value: 'transactions',
				action: 'Get transactions info',
			},
		],
	},
	...transactionsDescription,
];

export default description;
