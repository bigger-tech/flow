import { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import * as newAccount from './newAccount';
import * as payments from './payments';
import * as swapAssets from './swapAssets';
import * as transactionBuilder from './transactionBuilder';
import * as offers from './offers';
import * as settings from './settings';
import * as sponsorship from './sponsorship';
import * as accountMerge from './accountMerge';
import * as liquidityPool from './liquidityPool';
import * as claimableBalance from './claimable';
import * as clawback from './clawback';
import * as trust from './trust';

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
			case 'accountMerge':
				responseData = await accountMerge[stellar.operation].execute.call(this);
				break;
			case 'manageData':
				responseData = await settings[stellar.operation].execute.call(this);
				break;
			case 'bumpSequence':
				responseData = await settings[stellar.operation].execute.call(this);
				break;
			case 'claimClaimableBalance':
				responseData = await claimableBalance[stellar.operation].execute.call(this);
				break;
			case 'clawback':
				responseData = await clawback[stellar.operation].execute.call(this);
				break;
			case 'clawbackClaimableBalance':
				responseData = await clawback[stellar.operation].execute.call(this);
				break;
			case 'liquidityPoolDeposit':
				responseData = await liquidityPool[stellar.operation].execute.call(this);
				break;
			case 'liquidityPoolWithdraw':
				responseData = await liquidityPool[stellar.operation].execute.call(this);
				break;
			case 'createAccount':
				responseData = await newAccount[stellar.operation].execute.call(this);
				break;
			case 'fundAccount':
				responseData = await newAccount[stellar.operation].execute.call(this);
				break;
			case 'manageSellOffer':
				responseData = await offers[stellar.operation].execute.call(this);
				break;
			case 'manageBuyOffer':
				responseData = await offers[stellar.operation].execute.call(this);
				break;
			case 'pathPaymentStrictReceive':
				responseData = await payments[stellar.operation].execute.call(this);
				break;
			case 'getPayment':
				responseData = await payments[stellar.operation].execute.call(this);
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
			case 'beginSponsoring':
				responseData = await sponsorship[stellar.operation].execute.call(this);
				break;
			case 'endSponsoring':
				responseData = await sponsorship[stellar.operation].execute.call(this);
				break;
			case 'revokeSponsorship':
				responseData = await sponsorship[stellar.operation].execute.call(this);
				break;
			case 'swap':
				responseData = await swapAssets[stellar.operation].execute.call(this);
				break;
			case 'changeTrust':
				responseData = await trust[stellar.operation].execute.call(this);
				break;
			case 'setTrustline':
				responseData = await trust[stellar.operation].execute.call(this);
				break;
			case 'build':
				responseData = await transactionBuilder.build.execute.call(this);
				break;
			case 'sign':
				responseData = await transactionBuilder.sign.execute.call(this);
				break;
		}
		outputData.push(responseData as IDataObject);
	} catch (error) {
		throw new Error(error);
	}

	return [this.helpers.returnJsonArray(outputData)];
}
