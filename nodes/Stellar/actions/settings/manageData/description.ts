import { INodeProperties } from 'n8n-workflow';

export const manageDataDescription: INodeProperties[] = [
	{
		displayName: 'Entry Name',
		name: 'entryName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['settings'],
				operation: ['manageData'],
			},
		},
		default: '',
	},
	{
		displayName: 'Entry Value',
		name: 'entryValue',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['settings'],
				operation: ['manageData'],
			},
		},
		description: 'If empty, will delete the data entry named in this operation',
		default: '',
	},
	{
		displayName: 'Source Account',
		name: 'sourceAccount',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['settings'],
				operation: ['manageData'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account public key',
	},
];
