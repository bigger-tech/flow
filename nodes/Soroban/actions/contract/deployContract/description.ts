import { ContractsProperties } from '../../entities/SorobanNode';

export const deployContractDescription: ContractsProperties = [
	{
		displayName: 'Account',
		name: 'account',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['contract'],
				operation: ['deployContract'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
	},
	{
		displayName: 'Wasm Hash of the Contract',
		name: 'wasmHash',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['contract'],
				operation: ['deployContract'],
			},
		},
		default: '24a4f9b0a5bcbb82b24d1f623e874f5da2ee1188c5a4886ddb77a46b8c32bf87',
		placeholder: '24a4f9b0a5bcbb82b24d1f623e874f5da2ee1188c5a4886ddb77a46b8c32bf87',
	},
];
