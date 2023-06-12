import { ServerProperties } from '../../entities/IStellarNode';

export const checkLastPaymentsDescription: ServerProperties = [
	{
		displayName: 'Public Key',
		name: 'publicKey',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['server'],
				operation: ['checkLastPayments'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account public key',
	},
];
