import { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import * as newAccount from './newAccount';
import * as fundAccount from './fundAccount';
import * as payments from './payments';
import * as swapAssets from './swapAssets';
import * as transaction from './transaction';
import * as offers from './offers';
import * as settings from './settings';
import * as sponsorship from './sponsorship';
import * as accountMerge from './accountMerge';
import * as liquidityPool from './liquidityPool';
import * as claimableBalance from './claimable';
import * as clawback from './clawback';
import * as trust from './trust';
import { Stellar } from '../actions/entities/IStellarNode';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const operation = this.getNodeParameter('operation', 0);
	const resource = this.getNodeParameter('resource', 0) as string;
	const stellar = { resource, operation } as Stellar;
	const items = this.getInputData();
	let nodeOutput: IDataObject[] = [];
	let response;

	for (const item of items) {
		if (item.json.operation) {
			nodeOutput.push(item);
		}
	}

	try {
		switch (stellar.resource) {
			case 'accountMerge':
				response = await accountMerge[stellar.operation].execute.call(this);
				break;
			case 'settings':
				response = await settings[stellar.operation].execute.call(this);
				break;
			case 'claimableBalance':
				response = await claimableBalance[stellar.operation].execute.call(this);
				break;
			case 'clawback':
				response = await clawback[stellar.operation].execute.call(this);
				break;
			case 'liquidityPool':
				response = await liquidityPool[stellar.operation].execute.call(this);
				break;
			case 'newAccount':
				response = await newAccount[stellar.operation].execute.call(this);
				break;
			case 'fundAccount':
				response = await fundAccount[stellar.operation].execute.call(this);
				break;
			case 'offers':
				response = await offers[stellar.operation].execute.call(this);
				break;
			case 'payments':
				if (stellar.operation === 'getPayment')
					response = await payments.getPayment.execute.call(this);
				else response = await payments[stellar.operation].execute.call(this);
				break;
			case 'sponsorship':
				response = await sponsorship[stellar.operation].execute.call(this);
				break;
			case 'swapAssets':
				response = await swapAssets[stellar.operation].execute.call(this);
				break;
			case 'trust':
				response = await trust[stellar.operation].execute.call(this);
				break;
			case 'transaction':
				response = await transaction[stellar.operation].execute.call(this);
				if (stellar.operation === 'build') removeOperationsFromnodeOutput(nodeOutput);
				break;
		}

		nodeOutput.push(response as IDataObject);
	} catch (error) {
		throw new Error(error);
	}

	return [this.helpers.returnJsonArray(nodeOutput)];
}

function removeOperationsFromnodeOutput(nodeOutput: any[]) {
	for (let i = nodeOutput.length - 1; i >= 0; i--) {
		const operation = nodeOutput[i].json.operation;

		if (operation) {
			nodeOutput.splice(i, 1);
		}
	}
}
