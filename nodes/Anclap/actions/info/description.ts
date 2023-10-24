import { INodeProperties } from 'n8n-workflow';
import { transactionsDescription } from './transactions/description';
import { transactionDescription } from './transaction/description';
import { feeDescription } from './fee/description';
import { transferServerDescription } from './transferServer/description';
import { quoteServerDescription } from './quoteServer/description';
import { pricesDescription } from './prices/description';
import { priceDescription } from './price/description';
import { firmQuoteDescription } from './firmQuote/description';
import { quoteDescription } from './quote/description';

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
				name: 'Get Quote Server Info',
				value: 'quoteServer',
				action: 'Get quote server info',
			},
			{
				name: 'Get Indicative Prices',
				value: 'prices',
				action: 'Get indicative prices',
			},
			{
				name: 'Get Indicative Price',
				value: 'price',
				action: 'Get indicative price',
			},
			{
				name: 'Get Firm Quote',
				value: 'firmQuote',
				action: 'Get firm quote',
			},
			{
				name: 'Get Quote by ID',
				value: 'quote',
				action: 'Get quote by id',
			},
		],
	},
	...transactionsDescription,
	...transactionDescription,
	...feeDescription,
	...transferServerDescription,
	...quoteServerDescription,
	...pricesDescription,
	...priceDescription,
	...firmQuoteDescription,
	...quoteDescription,
];

export default description;
