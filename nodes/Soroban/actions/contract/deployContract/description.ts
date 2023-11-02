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
		default: '',
		placeholder: 'b053248d579b13717ea635c70727658eb8fee731c01f658152ddc72a1035e246',
	},
];
