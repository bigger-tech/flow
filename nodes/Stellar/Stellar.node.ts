import StellarSdk from 'stellar-sdk';
import {
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

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
		const item = this.getInputData();
		const operation = this.getNodeParameter('operation', 0) as string;
		const publicKey = item[0].json.publicKey;
		let outputData = [];
		if (operation === 'fundAccount') {
			const fundAccountRequestOptions: IHttpRequestOptions = {
				url: `https://friendbot.stellar.org/?addr=${publicKey}`,
				method: 'GET',
			};
			const fundAccountResponse = await this.helpers.httpRequest(fundAccountRequestOptions);
			return [this.helpers.returnJsonArray(fundAccountResponse)];
		}

		if (operation === 'createAccount') {
			const pair = StellarSdk.Keypair.random();
			const newKeyPair = {
				publicKey: pair.publicKey(),
				secretKey: pair.secret(),
			};
			outputData.push(newKeyPair);
		}
		return [this.helpers.returnJsonArray(outputData)];
	}
}
