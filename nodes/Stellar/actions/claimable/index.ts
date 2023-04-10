import { INodeProperties } from 'n8n-workflow';
import * as claimClaimableBalance from './claimClaimableBalance';
export { claimClaimableBalance };

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'createClaimableBalance',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['claimable'],
			},
		},
		options: [
			{
				name: 'Create Claimable Balance',
				value: 'createClaimableBalance',
				description: 'Creates a claimable balance',
				action: 'Create claimable balance',
			},
			{
				name: 'Claim Claimable Balance',
				value: 'claimClaimableBalance',
				description: 'Claims a claimable balance',
				action: 'Claim claimable balance',
			},
		],
	},
	...claimClaimableBalance.description,
];
