import { INodeProperties } from 'n8n-workflow';
import * as deployContract from './deployContract';

const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'deployContract',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contract'],
			},
		},
		options: [
			{
				name: 'Deploy Contract',
				value: 'deployContract',
				description: 'Deploy a contract to the blockchain',
				action: 'Deploy contract',
			},
		],
	},
	...deployContract.description,
];

export default description;
