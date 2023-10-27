import { SettingsProperties } from '../../entities/SorobanNode';

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
];
