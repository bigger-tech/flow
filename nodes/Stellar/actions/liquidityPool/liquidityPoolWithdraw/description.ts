import { INodeProperties } from 'n8n-workflow';

export const liquidityPoolWithdrawDescription: INodeProperties[] = [
	{
		displayName: 'Liquidity Pool ID',
		name: 'liquidityPoolId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['liquidityPool'],
				operation: ['liquidityPoolWithdraw'],
			},
		},
		default: '',
		description: 'The PoolID for the Liquidity Pool to withdraw from',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['liquidityPool'],
				operation: ['liquidityPoolWithdraw'],
			},
		},
		default: '',
		description: 'Amount of pool shares to withdraw',
	},
	{
		displayName: 'Min Amount A',
		name: 'minAmountA',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['liquidityPool'],
				operation: ['liquidityPoolWithdraw'],
			},
		},
		default: '',
		description: 'Minimum amount of the first asset to withdraw',
	},
	{
		displayName: 'Min Amount B',
		name: 'minAmountB',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['liquidityPool'],
				operation: ['liquidityPoolWithdraw'],
			},
		},
		default: '',
		description: 'Minimum amount of the second asset to withdraw',
	},
	{
		displayName: 'Source Account',
		name: 'sourceAccount',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['liquidityPool'],
				operation: ['liquidityPoolWithdraw'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account public key',
	},
];
