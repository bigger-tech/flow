import { INodeProperties } from 'n8n-workflow';
import { description as depositDescription } from './deposit';
import { description as withdrawDescription } from './withdraw';
import { description as depositInteractiveDescription } from './depositInteractive';
import { description as withdrawInteractiveDescription } from './withdrawInteractive';
import { description as paymentDescription } from './payment';
import { description as paymentCallback } from './paymentCallback';

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
				name: 'Initiate Direct Payment',
				value: 'payment',
				action: 'Initiate direct payment',
			},
			{
				name: 'Direct Payment Callback',
				value: 'paymentCallback',
				action: 'Direct payment callback',
			},
		],
	},
	...depositDescription,
	...withdrawDescription,
	...depositInteractiveDescription,
	...withdrawInteractiveDescription,
	...paymentDescription,
	...paymentCallback,
];

export default description;
