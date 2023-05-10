import { INodeProperties } from 'n8n-workflow';
import * as get from './get';
import * as send from './send';
export { get, send };

export const description: INodeProperties[] = [
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
	...get.description,
	...send.description,
];
