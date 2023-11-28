import { IExecuteFunctions } from 'n8n-workflow';
import { Contract, xdr } from 'soroban-client';
import { CustomScVal, toScVal } from './helpers/helpers';

export async function invokeContract(this: IExecuteFunctions) {
	const functionName = this.getNodeParameter('functionName', 0) as string;
	const contractAddress = this.getNodeParameter('contractAddress', 0) as string;
	const { contractParams }: { contractParams: CustomScVal[] } = this.getNodeParameter(
		'functionParams',
		0,
	) as { contractParams: CustomScVal[] };

	const params: xdr.ScVal[] = [];
	if (contractParams) {
		for (const { value, type } of contractParams) {
			params.push(toScVal(value, type));
		}
	}

	try {
		const contract = new Contract(contractAddress);

		const contractOperation = contract.call(functionName, ...params).toXDR('base64');

		return { operation: contractOperation };
	} catch (error) {
		throw new Error(error);
	}
}
