import { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import resources, { MykoboResources } from './resources';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const operation = this.getNodeParameter('operation', 0);
	const resource = this.getNodeParameter('resource', 0) as MykoboResources;
	const mykobo = { resource, operation };
	const items = this.getInputData();
	let output: IDataObject[] = [];
	let response;

	for (const item of items) {
		if (item.json.operation) {
			output.push(item);
		}
	}

	try {
		response = await resources[mykobo.resource].operations[mykobo.operation].execute.call(this);
		output.push(response as IDataObject);
	} catch (error) {
		throw new Error(error);
	}

	return [this.helpers.returnJsonArray(output)];
}
