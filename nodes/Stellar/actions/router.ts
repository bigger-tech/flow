import { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import * as newAccount from './newAccount';
import * as payments from './payments';
import * as swapAssets from './swapAssets';
import * as offers from './offers';
import * as settings from './settings';
import * as sponsorship from './sponsorship';
import * as accountMerge from './accountMerge';
import * as liquidityPool from './liquidityPool';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const operation = this.getNodeParameter('operation', 0);
	const resource = this.getNodeParameter('resource', 0) as string;
	const stellar = { resource, operation };
	const items = this.getInputData();
	let outputData = [];
	let responseData;
	items.forEach((item) => {
		if (item.json.operation) {
			outputData.push(item as IDataObject);
		}
	});

	try {
		switch (stellar.operation) {
			case 'createAccount':
				responseData = await newAccount[stellar.operation].execute.call(this);
				break;
			case 'fundAccount':
				responseData = await newAccount[stellar.operation].execute.call(this);
				break;
			case 'getPayment':
				responseData = await payments[stellar.operation].execute.call(this);
				break;
			case 'swap':
				responseData = await swapAssets[stellar.operation].execute.call(this);
				break;
			case 'makePayment':
				responseData = await payments[stellar.operation].execute.call(this);
				break;
			case 'pathPaymentStrictSend':
				responseData = await payments[stellar.operation].execute.call(this);
				break;
			case 'pathPaymentStrictReceive':
				responseData = await payments[stellar.operation].execute.call(this);
				break;
			case 'manageSellOffer':
				responseData = await offers[stellar.operation].execute.call(this);
				break;
			case 'accountMerge':
				responseData = await accountMerge[stellar.operation].execute.call(this);
				break;
			case 'manageData':
				responseData = await settings[stellar.operation].execute.call(this);
				break;
			case 'revokeSponsorship':
				responseData = await sponsorship[stellar.operation].execute.call(this);
				break;
			case 'liquidityPoolDeposit':
				responseData = await liquidityPool[stellar.operation].execute.call(this);
				break;
		}
		outputData.push(responseData as IDataObject);
	} catch (error) {
		throw new Error(error);
	}

	return [this.helpers.returnJsonArray(outputData)];
}
