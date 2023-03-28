import { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import * as newAccount from './newAccount';
import * as payments from './payments';
import * as swapAssets from './swapAssets';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const operation = this.getNodeParameter('operation', 0);
	const resource = this.getNodeParameter('resource', 0) as string;

	let outputData = [];
	let responseData;

	const stellar = { resource, operation };

	try {
		switch (stellar.operation) {
			case 'createAccount':
				responseData = await newAccount.createAccount.execute.call(this);
				break;
			case 'fundAccount':
				responseData = await newAccount.fundAccount.execute.call(this);
				break;
			case 'getPayment':
				responseData = await payments[stellar.operation].execute.call(this);
				break;
			case 'swap':
				responseData = await swapAssets.swap.execute.call(this);
				break;
		}

		outputData.push(responseData as IDataObject);
	} catch (error) {
		responseData = { error: error.message } as IDataObject;
	}

	return [this.helpers.returnJsonArray(outputData)];
}
