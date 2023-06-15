import { INodeProperties } from 'n8n-workflow';
import { description as getDescription } from './get';
import { description as sendDescription } from './send';

const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'get',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['token'],
			},
		},
		options: [
			{
				name: 'Get Challenge',
				value: 'get',
				action: 'Get challenge',
			},
			{
				name: 'Send Challenge',
				value: 'send',
				action: 'Send challenge',
			},
		],
	},
	...getDescription,
	...sendDescription,
];

export default description;
