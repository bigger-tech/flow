import { SettingsProperties } from '../../entities/SorobanNode';

export const manageDataDescription: SettingsProperties = [
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
];
