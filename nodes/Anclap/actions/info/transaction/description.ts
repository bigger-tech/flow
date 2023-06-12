import { INodeProperties } from 'n8n-workflow';

export const transactionDescription: INodeProperties[] = [
	{
		displayName: 'Token',
		name: 'token',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['info'],
				operation: ['transaction'],
			},
		},
		default: '',
	},
	{
		displayName: 'Transaction ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['info'],
				operation: ['transaction'],
			},
		},
		default: '',
		placeholder: '06050341-97x2-410b-ba42-bec546abadea',
	},
];
