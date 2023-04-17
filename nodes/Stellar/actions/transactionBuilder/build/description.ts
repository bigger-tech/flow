import { INodeProperties } from 'n8n-workflow';

export const transactionBuilderDescription: INodeProperties[] = [
	{
		displayName: 'Source Account',
		name: 'publicKey',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['transactionBuilder'],
				operation: ['build'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account public key',
	},
	{
		displayName: 'Fee',
		name: 'fee',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['transactionBuilder'],
				operation: ['build'],
			},
		},
		default: '',
		placeholder: 'Leave empty if you want to use the base fee',
		description: 'Transaction fee',
	},
	{
		displayName: 'Timeout (Seconds)',
		name: 'timeout',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['transactionBuilder'],
				operation: ['build'],
			},
		},
		default: 30,
		description: 'Time in seconds where the TX is valid',
	},
];
