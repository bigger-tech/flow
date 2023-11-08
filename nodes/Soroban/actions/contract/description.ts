import { INodeProperties } from 'n8n-workflow';
import * as deployContract from './deployContract';
import * as invokeContract from './invokeContract';

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
			{
				name: 'Invoke Contract',
				value: 'invokeContract',
				description: 'Invoke a contract from the blockchain',
				action: 'Invoke contract',
			},
		],
	},
	...deployContract.description,
	...invokeContract.description,
];

export default description;
