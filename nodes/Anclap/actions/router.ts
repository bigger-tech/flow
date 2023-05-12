import { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import * as token from './token';
import * as transactions from './transactions';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const operation = this.getNodeParameter('operation', 0);
	const resource = this.getNodeParameter('resource', 0) as string;
	const anclap = { resource, operation };
	const items = this.getInputData();
	let outputData: IDataObject[] = [];
	let responseData;

	for (const item of items) {
		if (item.json.operation) {
			outputData.push(item);
		}
	}

	try {
		switch (anclap.operation) {
			case 'get':
				responseData = await token.get.call(this);
				break;
			case 'send':
				responseData = await token.send.call(this);
				break;
			case 'deposit':
				responseData = await transactions.deposit.call(this);
				break;
			case 'withdraw':
				responseData = await transactions.withdraw.call(this);
				break;
		}

		outputData.push(responseData as IDataObject);
	} catch (error) {
		throw new Error(error);
	}

	return [this.helpers.returnJsonArray(outputData)];
}
