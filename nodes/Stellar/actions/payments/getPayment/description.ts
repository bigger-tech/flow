import { INodeProperties } from 'n8n-workflow';

export const getLastPaymentDescription: INodeProperties[] = [
	{
		displayName: 'Public Key',
		name: 'publicKey',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['payments'],
				operation: ['getPayment'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account public key',
	},
];
