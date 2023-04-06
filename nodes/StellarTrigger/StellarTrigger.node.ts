import { INodeType, INodeTypeDescription, ITriggerFunctions, ITriggerResponse } from 'n8n-workflow';

import { Server } from 'stellar-sdk';
import IAssetParam from './IAssetParam';
import { validateTx } from './helpers/helpers';
import { setNetwork } from '../Stellar/transport';

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
		credentials: [{ name: 'stellarNetworkApi', required: true }],
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
			{
				displayName: 'Assets',
				name: 'assets',
				type: 'fixedCollection',
				required: true,
				typeOptions: {
					multipleValues: true,
				},
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
								required: true,
							},
							{
								displayName: 'Issuer',
								name: 'issuer',
								type: 'string',
								default: '',
							},
						],
					},
				],
				default: {},
			},
		],
	};

	async trigger(this: ITriggerFunctions): Promise<ITriggerResponse> {
		const publicKey = this.getNodeParameter('account', 1) as string;
		const assets = this.getNodeParameter('assets', 1) as IAssetParam;
		const network = await setNetwork.call(this);
		const server = new Server(network.url);

		const handle = (tx: any) => {
			if (validateTx(tx, assets)) {
				this.emit([this.helpers.returnJsonArray([{ tx }])]);
			}
		};

		server.payments().forAccount(publicKey).cursor('now').limit(1).stream({
			onmessage: handle,
		});

		return {};
	}
}
