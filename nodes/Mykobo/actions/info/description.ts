import { INodeProperties } from 'n8n-workflow';
import { transactionsDescription } from './transactions/description';
import { transactionDescription } from './transaction/description';
import { feeDescription } from './fee/description';
import { transferServerDescription } from './transferServer/description';
import { supportedCurrenciesDescription } from './directPayment/description';
import { directPaymentDescription } from './directPaymentTransaction/description';

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
				action: 'Get fee amount',
			},
			{
				name: 'Get Transfer Server Info',
				value: 'transferServer',
				action: 'Get transfer server info',
			},
			{
				name: 'Get Direct Payment Currencies',
				value: 'directPayment',
				action: 'Get direct payment currencies',
			},
			{
				name: 'Get Direct Payment Transaction',
				value: 'directPaymentTransaction',
				action: 'Get direct payment transaction',
			},
		],
	},
	...transactionsDescription,
	...transactionDescription,
	...feeDescription,
	...transferServerDescription,
	...supportedCurrenciesDescription,
	...directPaymentDescription,
];

export default description;
