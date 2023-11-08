import { IExecuteFunctions } from 'n8n-workflow';
import { xdr, Operation, StrKey, Address } from 'soroban-client';
import { hexToByte } from './helpers/functions';

export async function invokeContract(this: IExecuteFunctions) {
	try {
		const functionName = this.getNodeParameter('functionName', 0) as string;
		const contractId = this.getNodeParameter('contractId', 0) as string;
		const sourceAccount = this.getNodeParameter('sourceAccount', 0) as string;

		const byteContractId = hexToByte(contractId);
		const contractAdress = StrKey.encodeContract(byteContractId);
		const address = new Address(contractAdress);
		const invokeContract = new xdr.InvokeContractArgs({
			contractAddress: address.toScAddress(),
			functionName: functionName,
			args: [],
		});

		const hostFunction: xdr.HostFunction =
			xdr.HostFunction.hostFunctionTypeInvokeContract(invokeContract);

		const operationEnvelope = Operation.invokeHostFunction({
			func: hostFunction,
			auth: [],
		});

		return { operation: operationEnvelope.toXDR('base64'), sourceAccount };
	} catch (error) {
		throw new Error(error);
	}
}
