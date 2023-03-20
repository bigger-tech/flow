import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { fundAccount, createAccountKeypair, getLastPayment, setNetwork } from './services/stellar';

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
				options: [
					{
						name: 'Testnet',
						value: 'testnet',
					},
					{
						name: 'Pubnet',
						value: 'pubnet',
					},
				],
				default: 'testnet',
				noDataExpression: true,
				required: true,
				description: 'Stellar Network:',
			},
			{
				displayName: 'Operations',
				name: 'operation',
				type: 'options',
				default: 'createAccount',
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
						displayOptions: {
							show: {
								resource: ['testnet'],
							},
						},
					},
					{
						name: 'Get Payment',
						value: 'getPayment',
						action: 'Get last payment',
					},
				],
				noDataExpression: true,
			},
			{
				displayName: 'Public Key',
				name: 'publicKey',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['getPayment'],
						resource: ['stellar'],
					},
				},
				default: '',
				placeholder: '1234',
				description: 'Account public key',
			},
		],
	};
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const operation = this.getNodeParameter('operation', 0) as string;
		const network = this.getNodeParameter('resource', 0) as string;
		const publicKey = items[0].json.publicKey as string;
		let outputData = [];

		setNetwork(network);

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
				break;
		}
		return [this.helpers.returnJsonArray(outputData)];
	}
}
