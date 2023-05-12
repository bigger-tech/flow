import { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import * as token from './token';
import * as transactions from './transactions';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const operation = this.getNodeParameter('operation', 0);
	const resource = this.getNodeParameter('resource', 0) as string;
	const anclap = { resource, operation };
	const items = this.getInputData();
	let output: IDataObject[] = [];
	let response;

	for (const item of items) {
		if (item.json.operation) {
			output.push(item);
		}
	}

	try {
		switch (anclap.operation) {
			case 'get':
				response = await token.get.call(this);
				break;
			case 'send':
				response = await token.send.call(this);
				break;
			case 'deposit':
				response = await transactions.deposit.call(this);
				break;
			case 'withdraw':
				response = await transactions.withdraw.call(this);
				break;
		}

		output.push(response as IDataObject);
	} catch (error) {
		throw new Error(error);
	}

	return [this.helpers.returnJsonArray(output)];
}
