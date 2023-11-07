import { ContractsProperties } from '../../entities/SorobanNode';

export const getContractDescription: ContractsProperties = [
	{
		displayName: 'Contract ID',
		name: 'contractId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['contract'],
				operation: ['getContract'],
			},
		},
		default: 'e24513c44fc5edb121fc6ec1e62f6f079c269f73c1389a5ed5464b0f41325a1d',
		placeholder: 'e24513c44fc5edb121fc6ec1e62f6f079c269f73c1389a5ed5464b0f41325a1d',
	},
];
