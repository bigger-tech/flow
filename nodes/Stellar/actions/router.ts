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
	let outputData: IDataObject[] = [];
	let responseData;

	for (const item of items) {
		if (item.json.operation) {
			outputData.push(item);
		}
	}

	try {
		switch (stellar.resource) {
			case 'accountMerge':
				responseData = await accountMerge[stellar.operation].execute.call(this);
				break;
			case 'settings':
				responseData = await settings[stellar.operation].execute.call(this);
				break;
			case 'claimableBalance':
				responseData = await claimableBalance[stellar.operation].execute.call(this);
				break;
			case 'clawback':
				responseData = await clawback[stellar.operation].execute.call(this);
				break;
			case 'liquidityPool':
				responseData = await liquidityPool[stellar.operation].execute.call(this);
				break;
			case 'newAccount':
				responseData = await newAccount[stellar.operation].execute.call(this);
				break;
			case 'fundAccount':
				responseData = await fundAccount[stellar.operation].execute.call(this);
				break;
			case 'offers':
				responseData = await offers[stellar.operation].execute.call(this);
				break;
			case 'payments':
				if (stellar.operation === 'getPayment')
					responseData = await payments.getPayment.execute.call(this);
				else responseData = await payments[stellar.operation].execute.call(this);
				break;
			case 'sponsorship':
				responseData = await sponsorship[stellar.operation].execute.call(this);
				break;
			case 'swapAssets':
				responseData = await swapAssets[stellar.operation].execute.call(this);
				break;
			case 'trust':
				responseData = await trust[stellar.operation].execute.call(this);
				break;
			case 'transaction':
				responseData = await transaction[stellar.operation].execute.call(this);
				if (stellar.operation === 'build') removeOperationsFromOutputData(outputData);
				break;
		}

		outputData.push(responseData as IDataObject);
	} catch (error) {
		throw new Error(error);
	}

	return [this.helpers.returnJsonArray(outputData)];
}

function removeOperationsFromOutputData(outputData: any[]) {
	for (let i = outputData.length - 1; i >= 0; i--) {
		const operation = outputData[i].json.operation;

		if (operation) {
			outputData.splice(i, 1);
		}
	}
}
