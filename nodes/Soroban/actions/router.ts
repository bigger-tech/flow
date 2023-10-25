import { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { Soroban } from './entities/SorobanNode';
import resources from './resources';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const operation = this.getNodeParameter('operation', 0);
	const resource = this.getNodeParameter('resource', 0) as string;
	const soroban = { resource, operation } as Soroban;
	const items = this.getInputData();

	let nodeOutput: IDataObject[] = [];
	let response;

	for (const item of items) {
		const {
			json: { operation },
		} = item;
		if (soroban.resource !== 'transaction' && operation) nodeOutput.push(item);
	}

	try {
		response = await resources[soroban.resource].operations[soroban.operation].execute.call(this);
		nodeOutput.push(response as IDataObject);
	} catch (error) {
		throw new Error(error);
	}

	return [this.helpers.returnJsonArray(nodeOutput)];
}
