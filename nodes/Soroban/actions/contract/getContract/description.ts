import { ContractsProperties } from '../../entities/SorobanNode';

export const getContractDescription: ContractsProperties = [
	{
		displayName: 'Contract',
		name: 'contract',
		type: 'fixedCollection',
		displayOptions: {
			show: {
				resource: ['contract'],
				operation: ['getContract'],
			},
		},
		required: true,
		default: {},
		options: [
			{
				name: 'values',
				displayName: 'Contract',
				values: [
					{
						displayName: 'Contract Type',
						name: 'contractType',
						type: 'options',
						required: true,

						options: [
							{
								name: 'Contract ID',
								value: 'contractId',
							},
							{
								name: 'Contract Address',
								value: 'contractAddress',
							},
						],
						default: 'contractAddress',
					},
					{
						displayName: 'Value',
						name: 'contractValue',
						type: 'string',
						default: '',
					},
				],
			},
		],
	},
];
