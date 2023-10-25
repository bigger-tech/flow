import { NewAccountProperties } from '../entities/SorobanNode';

const description: NewAccountProperties = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'createAccount',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['newAccount'],
			},
		},
		options: [
			{
				name: 'Create Account',
				value: 'createAccount',
				description: 'Create a new Soroban account',
				action: 'Create a new soroban account',
			},
		],
	},
];

export default description;
