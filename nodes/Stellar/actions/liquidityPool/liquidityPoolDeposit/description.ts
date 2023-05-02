import { LiquidityPoolProperties } from '../../entities/IStellarNode';

export const liquidityPoolDepositDescription: LiquidityPoolProperties = [
	{
		displayName: 'Liquidity Pool ID',
		name: 'liquidityPoolId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['liquidityPool'],
				operation: ['liquidityPoolDeposit'],
			},
		},
		default: '',
		placeholder: 'Example: 67260c4c1807b262ff851b0a3fe141194936bb0215b2f77447f1df11998eabb9',
		description: 'The PoolID for the Liquidity Pool to deposit into',
	},
	{
		displayName: 'Max Amount A',
		name: 'maxAmountA',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['liquidityPool'],
				operation: ['liquidityPoolDeposit'],
			},
		},
		default: '',
		description: 'Maximum amount of the first asset to withdraw',
	},
	{
		displayName: 'Max Amount B',
		name: 'maxAmountB',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['liquidityPool'],
				operation: ['liquidityPoolDeposit'],
			},
		},
		default: '',
		description: 'Maximum amount of the second asset to withdraw',
	},
	{
		displayName: 'Min Price',
		name: 'isMinPriceAFraction',
		description: 'Minimum depositA/depositB price',
		type: 'options',
		default: false,
		displayOptions: {
			show: {
				resource: ['liquidityPool'],
				operation: ['liquidityPoolDeposit'],
			},
		},
		options: [
			{
				name: 'Number',
				value: false,
			},
			{
				name: 'Fraction',
				value: true,
			},
		],
	},
	{
		displayName: 'Number',
		name: 'minPriceNumber',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				isMinPriceAFraction: [false],
			},
		},
	},
	{
		displayName: 'Min Price Fraction',
		name: 'minPriceFraction',
		type: 'fixedCollection',
		default: {},
		required: true,
		options: [
			{
				name: 'values',
				displayName: 'Fraction',
				values: [
					{
						displayName: 'Numerator',
						name: 'numerator',
						type: 'number',
						placeholder: 'Numerator',
						default: '',
					},
					{
						displayName: 'Denominator',
						name: 'denominator',
						type: 'number',
						placeholder: 'Denominator',
						default: '',
					},
				],
			},
		],
		displayOptions: {
			show: {
				isMinPriceAFraction: [true],
			},
		},
	},
	{
		displayName: 'Max Price',
		name: 'isMaxPriceAFraction',
		description: 'Maximum depositA/depositB price',
		type: 'options',
		default: false,
		displayOptions: {
			show: {
				resource: ['liquidityPool'],
				operation: ['liquidityPoolDeposit'],
			},
		},
		options: [
			{
				name: 'Number',
				value: false,
			},
			{
				name: 'Fraction',
				value: true,
			},
		],
	},
	{
		displayName: 'Number',
		name: 'maxPriceNumber',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				isMaxPriceAFraction: [false],
			},
		},
	},
	{
		displayName: 'Fraction',
		name: 'maxPriceFraction',
		type: 'fixedCollection',
		default: {},
		required: true,
		options: [
			{
				name: 'values',
				displayName: 'Max Price Fraction',
				values: [
					{
						displayName: 'Numerator',
						name: 'numerator',
						type: 'number',
						placeholder: 'Numerator',
						default: '',
					},
					{
						displayName: 'Denominator',
						name: 'denominator',
						type: 'number',
						placeholder: 'Denominator',
						default: '',
					},
				],
			},
		],
		displayOptions: {
			show: {
				isMaxPriceAFraction: [true],
			},
		},
	},
	{
		displayName: 'Source Account',
		name: 'sourceAccount',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['liquidityPool'],
				operation: ['liquidityPoolDeposit'],
			},
		},
		default: '',
		placeholder: 'GCEVJ...',
		description: 'Account public key',
	},
];
