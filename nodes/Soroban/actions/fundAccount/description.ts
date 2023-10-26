import { FundAccountProperties } from '../entities/SorobanNode';

const description: FundAccountProperties = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'fundAccount',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['fundAccount'],
			},
		},
		options: [
			{
				name: 'Fund Account with Friendbot',
				value: 'fundAccount',
				description: 'Get futurenet lumens',
				action: 'Fund account in futurenet',
			},
		],
	},
];

export default description;
