import { IExecuteFunctions } from 'n8n-core';

import { IDataObject, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

import * as stellarSDK from 'stellar-sdk';

export class OnPayment implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'OnPayment',
		name: 'onPayment',
		group: ['transform'],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'Check account payments',
		defaults: {
			name: 'OnPayment',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [{ name: 'Verify', value: 'verify' }],
				default: 'verify',
				noDataExpression: true,
				required: true,
				description: 'Verify account payments',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['verify'],
					},
				},
				options: [
					{
						name: 'Set Account',
						value: 'setAccount',
						description: 'Set an account',
						action: 'Set an account',
					},
				],
				default: 'setAccount',
				noDataExpression: true,
			},
			{
				displayName: 'Public Key',
				name: 'publicKey',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['setAccount'],
						resource: ['verify'],
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
		const returnData: any[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			if (resource === 'verify') {
				if (operation === 'setAccount') {
					const publicKey = this.getNodeParameter('publicKey', i) as string;
					const data: IDataObject = {
						publicKey,
					};

					Object.assign(data);

					const server = new stellarSDK.Server('https://horizon-testnet.stellar.org');
					const payments = await server.payments().forAccount(publicKey).call();
					const lastPayment = payments.records[payments.records.length - 1];

					returnData.push(lastPayment);
				}
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
