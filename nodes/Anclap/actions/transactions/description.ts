import { INodeProperties } from 'n8n-workflow';
import { description as depositDescription } from './deposit';
import { description as withdrawDescription } from './withdraw';
import { description as depositInteractiveDescription } from './depositInteractive';
import { description as withdrawInteractiveDescription } from './withdrawInteractive';
import { description as depositExchangeDescription } from './depositExchange';
import { description as withdrawExchangeDescription } from './withdrawExchange';

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
				name: 'Deposit',
				value: 'deposit',
				action: 'Deposit',
			},
			{
				name: 'Withdraw',
				value: 'withdraw',
				action: 'Withdraw',
			},
			{
				name: 'Deposit Interactive',
				value: 'depositInteractive',
				action: 'Deposit interactive',
			},
			{
				name: 'Withdraw Interactive',
				value: 'withdrawInteractive',
				action: 'Withdraw interactive',
			},
			{
				name: 'Deposit Exchange',
				value: 'depositExchange',
				action: 'Deposit exchange',
			},
			{
				name: 'Withdraw Exchange',
				value: 'withdrawExchange',
				action: 'Withdraw exchange',
			},
		],
	},
	...depositDescription,
	...withdrawDescription,
	...depositInteractiveDescription,
	...withdrawInteractiveDescription,
	...depositExchangeDescription,
	...withdrawExchangeDescription,
];

export default description;
