import { INodeProperties } from 'n8n-workflow';

export const feeDescription: INodeProperties[] = [
    {
		displayName: 'Token',
		name: 'token',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['info'],
				operation: ['fee'],
			},
		},
		default: '',
	},
	{
		displayName: 'Operation type',
		name: 'operationType',
		type: 'string',
		required: false,
		displayOptions: {
			show: {
				resource: ['info'],
				operation: ['fee'],
			},
		},
		default: 'deposit',
		placeholder: 'deposit',
	},
    {
		displayName: 'Offchain Operation',
		name: 'type',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['info'],
				operation: ['fee'],
			},
		},
		default: 'bank_account',
		placeholder: 'bank_account',
	},
    {
		displayName: 'Asset Code',
		name: 'assetCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['info'],
				operation: ['fee'],
			},
		},
		default: 'ARS',
		placeholder: 'ARS',
	},
    {
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['info'],
				operation: ['fee'],
			},
		},
		default: '',
		placeholder: '100',
	},
]