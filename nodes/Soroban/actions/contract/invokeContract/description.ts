import { ContractsProperties } from '../../entities/SorobanNode';

export const invokeContractDescription: ContractsProperties = [
	{
		displayName: 'Transaction',
		name: 'transaction',
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
		displayName: 'Contract ID',
		name: 'contractId',
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
		displayName: 'Source Account',
		name: 'sourceAccount',
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
];
