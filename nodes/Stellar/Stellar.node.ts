import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { Asset } from 'stellar-sdk';

import IAsset from './entities/IAsset';
import { fundAccount, createAccountKeypair, getLastPayment, swapAssets } from './services/stellar';

export class Stellar implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Stellar',
		name: 'stellar',
		icon: 'file:stellar.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{ $parameter["operation"] }}',
		description: 'Create Stellar Account',
		defaults: {
			name: 'Stellar',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [{ name: 'Stellar', value: 'stellar' }],
				default: 'stellar',
				noDataExpression: true,
				required: true,
			},
			{
				displayName: 'Operations',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['stellar'],
					},
				},
				options: [
					{
						name: 'Create Account',
						value: 'createAccount',
						description: 'Create a new Stellar account',
						action: 'Create a new stellar account',
					},
					{
						name: 'Fund Account with Friendbot',
						value: 'fundAccount',
						action: 'Fund account with friendbot',
					},
					{
						name: 'Get Payment',
						value: 'getPayment',
						action: 'Get last payment',
					},
					{
						name: 'Swap on DEX',
						value: 'swapAssets',
						action: 'Swap assets',
					},
				],
				noDataExpression: true,
				default: 'createAccount',
			},
			{
				displayName: 'Public Key',
				name: 'publicKey',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['getPayment', 'swapAssets'],
						resource: ['stellar'],
					},
				},
				default: '',
				placeholder: '1234',
				description: 'Account public key',
			},
			{
				displayName: 'Amount',
				name: 'amount',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['swapAssets'],
						resource: ['stellar'],
					},
				},
				default: '',
				placeholder: '100',
			},
			{
				displayName: 'Slippage',
				name: 'slippage',
				type: 'collection',
				placeholder: 'Select slippage tolerance',
				required: true,
				default: {},
				options: [
					{
						displayName: 'Amount',
						name: 'amount',
						type: 'options',
						options: [
							{
								name: '0.1%',
								value: '0.1',
							},
							{
								name: '1.0%',
								value: '1.0',
							},
							{
								name: '2.0%',
								value: '2.0',
							},
						],
						default: '0.1',
					},
				],
				displayOptions: {
					show: {
						resource: ['stellar'],
						operation: ['swapAssets'],
					},
				},
			},
			{
				displayName: 'Source Asset',
				name: 'sourceAsset',
				type: 'fixedCollection',
				required: true,
				options: [
					{
						name: 'values',
						displayName: 'Values',
						values: [
							{
								displayName: 'Code',
								name: 'code',
								type: 'string',
								default: 'native',
							},
							{
								displayName: 'Issuer',
								name: 'issuer',
								type: 'string',
								default: 'native',
							},
						],
					},
				],
				displayOptions: {
					show: {
						operation: ['swapAssets'],
						resource: ['stellar'],
					},
				},
				default: {},
			},
			{
				displayName: 'Destination Asset',
				name: 'destinationAsset',
				type: 'fixedCollection',
				required: true,
				options: [
					{
						name: 'values',
						displayName: 'Values',
						values: [
							{
								displayName: 'Code',
								name: 'code',
								type: 'string',
								default: 'native',
							},
							{
								displayName: 'Issuer',
								name: 'issuer',
								type: 'string',
								default: 'native',
							},
						],
					},
				],
				displayOptions: {
					show: {
						operation: ['swapAssets'],
						resource: ['stellar'],
					},
				},
				default: {},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const operation = this.getNodeParameter('operation', 0) as string;
		const publicKey = items[0].json.publicKey as string;
		let outputData = [];

		switch (operation) {
			case 'fundAccount':
				try {
					const fundAccountRequest = fundAccount(publicKey);
					await this.helpers.httpRequest(fundAccountRequest);
				} catch (error) {
					outputData.push(error.message);
				}
				break;
			case 'createAccount':
				const newKeypair = createAccountKeypair();
				outputData.push(newKeypair);
				break;
			case 'getPayment':
				const publicKeyParam = this.getNodeParameter('publicKey', 1) as string;
				const lastPayment = await getLastPayment(publicKeyParam);
				outputData.push(lastPayment);
			case 'swapAssets':
				try {
					let sourceAsset: Asset;
					let destinationAssets: Asset;
					const amount = this.getNodeParameter('amount', 1) as string;
					const publicKeyParam = this.getNodeParameter('publicKey', 1) as string;
					const slippageAmount = this.getNodeParameter('slippage', 1) as { amount: string };
					const sourceAssetValues = this.getNodeParameter('sourceAsset', 1) as IAsset;
					const destinationAssetValues = this.getNodeParameter('destinationAsset', 1) as IAsset;

					if (sourceAssetValues.values.code === 'native') {
						sourceAsset = Asset.native();
					} else {
						sourceAsset = new Asset(sourceAssetValues.values.code, sourceAssetValues.values.issuer);
					}

					if (destinationAssetValues.values.code === 'native') {
						destinationAssets = Asset.native();
					} else {
						destinationAssets = new Asset(
							destinationAssetValues.values.code,
							destinationAssetValues.values.issuer,
						);
					}

					const swapResult = await swapAssets(
						sourceAsset,
						destinationAssets,
						amount,
						publicKeyParam,
						slippageAmount.amount,
					);
					outputData.push(swapResult);
				} catch (e) {
					outputData.push(e.message);
				}
				break;
		}

		return [this.helpers.returnJsonArray(outputData)];
	}
}
