import { SettingsProperties } from '../../entities/IStellarNode';

export const bumpSequenceDescription: SettingsProperties = [
	{
		displayName: 'BumpTo',
		name: 'bumpTo',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['settings'],
				operation: ['bumpSequence'],
			},
		},
		default: '',
	},
	{
		displayName: 'Source Account',
		name: 'sourceAccount',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['settings'],
				operation: ['bumpSequence'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account public key',
	},
];
