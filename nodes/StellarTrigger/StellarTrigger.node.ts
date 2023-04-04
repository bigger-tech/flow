import { INodeType, INodeTypeDescription, ITriggerFunctions, ITriggerResponse } from 'n8n-workflow';

import { Server } from 'stellar-sdk';

export class StellarTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Stellar Trigger',
		name: 'stellarTrigger',
		icon: 'file:stellar.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Handle Stellar events via webhooks',
		defaults: {
			name: 'Stellar Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [],
		properties: [
			{
				displayName: 'Account',
				name: 'account',
				type: 'string',
				required: true,
				default: '',
				options: [
					{
						name: 'Public Key',
						value: 'publicKey',
					},
				],
			},
		],
	};

	async trigger(this: ITriggerFunctions): Promise<ITriggerResponse> {
		const publicKey = this.getNodeParameter('account', 1) as string;
		const server = new Server('https://horizon-testnet.stellar.org');

		const txHandler = (txResponse: any) => {
			this.emit([this.helpers.returnJsonArray([{ txResponse }])]);
		};

		server.payments().forAccount(publicKey).stream({
			onmessage: txHandler,
		});

		async function closeFunction() {
			return;
		}

		return { closeFunction };
	}
}
