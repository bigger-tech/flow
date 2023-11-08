import { IExecuteFunctions } from 'n8n-workflow';
import { getContractAbi, transformAbi } from './helpers/helpers';

export async function getContract(this: IExecuteFunctions) {
	const contractId = this.getNodeParameter('contractId', 0) as string;

	const methods = await getContractAbi(contractId);
	const methodsTransformed = transformAbi(methods);

	return { methods: methodsTransformed };
}
