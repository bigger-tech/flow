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
				default: 'newAccount',
				options: [
					{
						name: 'New Account',
						value: 'newAccount',
					},
					{
						name: 'Payment',
						value: 'payments',
					},
					{
						name: 'Account Option',
						value: 'options',
					},
					{
						name: 'Offer',
						value: 'offers',
					},
				],
				noDataExpression: true,
				required: true,
				description: 'Operation Type:',
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
						name: 'Get Payment',
						value: 'getPayment',
						action: 'Get last payment',
					},
				],
				noDataExpression: true,
			},
			{
				displayName: 'Fund Account with Friendbot',
				name: 'fundAccount',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['testnet'],
						operation: ['createAccount'],
					},
				},
			},
			{
				displayName: 'Public Key',
				name: 'publicKey',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['pubnet', 'testnet'],
						operation: ['getPayment'],
					},
				},
				default: '',
				placeholder: '1234',
				description: 'Account public key',
			},
		],
	};
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const operation = this.getNodeParameter('operation', 0) as string;
		const network = this.getNodeParameter('resource', 0) as string;
		const isAccountToFund = network === 'testnet' ? this.getNodeParameter('fundAccount', 1) : false;
		let outputData = [];

		switch (operation) {
			case 'createAccount':
				const newKeypair = createAccountKeypair();
				outputData.push(newKeypair);

				if (isAccountToFund) {
					try {
						const fundAccountRequest = fundAccount(newKeypair.publicKey);
						await this.helpers.httpRequest(fundAccountRequest);
					} catch (error) {
						outputData.push({ 'Funding account error': error.message });
					}
				}
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
