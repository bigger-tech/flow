import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { fundAccount, createAccountKeypair } from './services/stellar';

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
				displayName: 'Operations',
				name: 'operation',
				type: 'options',
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
				],
				noDataExpression: true,
				default: 'createAccount',
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
		}
		return [this.helpers.returnJsonArray(outputData)];
	}
}
