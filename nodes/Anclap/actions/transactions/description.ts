import { INodeProperties } from 'n8n-workflow';
import { description as depositDescription } from './deposit';
import { description as withdrawDescription } from './withdraw';

const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'deposit',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
			},
		},
		options: [
			{
				name: 'Get Deposit',
				value: 'deposit',
				action: 'Get deposit interactive URL',
			},
			{
				name: 'Get Withdraw',
				value: 'withdraw',
				action: 'Get withdraw interactive URL',
			},
		],
	},
	...depositDescription,
	...withdrawDescription,
];

export default description;
