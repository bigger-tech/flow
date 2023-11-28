import { ContractsProperties } from '../../entities/SorobanNode';

export const invokeContractDescription: ContractsProperties = [
	{
		displayName: 'Contract Address',
		name: 'contractAddress',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['contract'],
				operation: ['invokeContract'],
			},
		},
	},
	{
		displayName: 'Function Name',
		name: 'functionName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['contract'],
				operation: ['invokeContract'],
			},
		},
		default: '',
		placeholder: 'Increment',
		description: 'The function to be invoked',
	},
	{
		displayName: 'Params',
		name: 'functionParams',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['contract'],
				operation: ['invokeContract'],
			},
		},
		options: [
			{
				name: 'contractParams',
				displayName: 'contractParams',
				values: [
					{
						displayName: 'Param Type',
						name: 'type',
						type: 'options',
						default: 'address',
						options: [
							{
								name: 'Address',
								value: 'address',
							},
							{
								name: 'scvAddress',
								value: 'scvAddress',
							},
							{
								name: 'scvContractInstance',
								value: 'scvContractInstance',
							},
							{
								name: 'Bytes',
								value: 'bytes',
							},
							{
								name: 'scvBytes',
								value: 'scvBytes',
							},
							{
								name: 'scvBytesN',
								value: 'scvBytesN',
							},
							{
								name: 'scvBool',
								value: 'scvBool',
							},
							{
								name: 'I32',
								value: 'i32',
							},
							{
								name: 'scvI32',
								value: 'scvI32',
							},
							{
								name: 'I64',
								value: 'i64',
							},
							{
								name: 'scvI64',
								value: 'scvI64',
							},
							{
								name: 'I128',
								value: 'i128',
							},
							{
								name: 'scvI128',
								value: 'scvI128',
							},
							{
								name: 'I256',
								value: 'i256',
							},
							{
								name: 'scvI256',
								value: 'scvI256',
							},

							{
								name: 'U64',
								value: 'u64',
							},

							{
								name: 'scvU64',
								value: 'scvU64',
							},

							{
								name: 'U32',
								value: 'u32',
							},
							{
								name: 'scvU32',
								value: 'scvU32',
							},

							{
								name: 'U128',
								value: 'u128',
							},

							{
								name: 'scvU128',
								value: 'scvU128',
							},
							{
								name: 'U256',
								value: 'u256',
							},
							{
								name: 'scvU256',
								value: 'scvU256',
							},
							{
								name: 'Timepoint',
								value: 'timepoint',
							},
							{
								name: 'scvTimepoint',
								value: 'scvTimepoint',
							},
							{
								name: 'Duration',
								value: 'duration',
							},
							{
								name: 'scvDuration',
								value: 'scvDuration',
							},
							{
								name: 'scvString',
								value: 'scvString',
							},
							{
								name: 'Boolean',
								value: 'boolean',
							},
							{
								name: 'Object',
								value: 'object',
							},
						],
					},
					{
						displayName: 'Param',
						name: 'value',
						type: 'string',
						required: true,
						default: '',
					},
				],
			},
		],
		default: {},
	},
];
