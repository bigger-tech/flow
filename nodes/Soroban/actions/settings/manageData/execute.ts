import { IExecuteFunctions } from 'n8n-workflow';
import { Operation } from 'soroban-client';

export async function manageData(this: IExecuteFunctions) {
	try {
		const name = this.getNodeParameter('entryName', 0) as string;
		const value = this.getNodeParameter('entryValue', 0) as string;

		const manageDataOperation = Operation.manageData({ name, value }).toXDR('base64');

		return { operation: manageDataOperation };
	} catch (error) {
		throw new Error(error);
	}
}
