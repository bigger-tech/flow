import { TransactionProperties } from '../../entities/IStellarNode';

export const transactionDescription: TransactionProperties = [
	{
		displayName: 'Source Account',
		name: 'publicKey',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['transaction'],
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
				resource: ['transaction'],
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
				resource: ['transaction'],
				operation: ['build'],
			},
		},
		default: 30,
		description: 'Time in seconds where the TX is valid',
	},
];
