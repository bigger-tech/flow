import { INodeProperties } from 'n8n-workflow';

export const directPaymentDescription: INodeProperties[] = [
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['info'],
				operation: ['directPaymentTransaction'],
			},
		},
		default: '',
		placeholder: '',
		description: 'The ID of the transaction',
	},
	{
		displayName: 'Show Optional Values',
		name: 'showOptionalValues',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['info'],
				operation: ['directPaymentTransaction'],
			},
		},
		default: false,
	},
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['info'],
				operation: ['directPaymentTransaction'],
				showOptionalValues: [true],
			},
		},
		default: '',
		placeholder: '',
		description: 'The ID of the transaction',
	},
	{
		displayName: 'Memo Type',
		name: 'memoType',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['info'],
				operation: ['directPaymentTransaction'],
				showOptionalValues: [true],
			},
		},
		default: '',
		placeholder: '',
		description: 'The type of memo to attach to the Stellar payment (text, hash, or ID)',
	},
	{
		displayName: 'Memo',
		name: 'memo',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['info'],
				operation: ['directPaymentTransaction'],
				showOptionalValues: [true],
			},
		},
		default: '',
		placeholder: '',
		description: 'The memo to attach to the Stellar payment',
	},
];
