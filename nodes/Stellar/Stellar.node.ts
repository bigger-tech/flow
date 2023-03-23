import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { fundAccount, createAccountKeypair, getLastPayment } from './services/stellar';
import * as newAccount from './actions/newAccount';
import * as payments from './actions/payments';

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
			...newAccount.description,
			...payments.description,
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
				outputData.push({ payment: lastPayment });
				break;
		}
		return [this.helpers.returnJsonArray(outputData)];
	}
}
