import { INodeProperties } from 'n8n-workflow';
import { transactionsDescription } from './transactions/description';
import { transactionDescription } from './transaction/description';
import { feeDescription } from './fee/description';
import { transferServerDescription } from './transfer-server/description';

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
				name: 'Get Transactions',
				value: 'transactions',
				action: 'Get transactions',
			},
			{
				name: 'Get Transaction By ID',
				value: 'transaction',
				action: 'Get transaction by ID',
			},
			{
				name: 'Get Fee Amount',
				value: 'fee',
				action: 'Get Fee Amount',
			},
			{
				name: 'Get Transfer Server Info',
				value: 'transferServer',
				action: 'Get Transfer Server Info',
			},
		],
	},
	...transactionsDescription,
	...transactionDescription,
	...feeDescription,
	...transferServerDescription,
];

export default description;
