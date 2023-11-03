import { randomBytes } from 'crypto';
import { IExecuteFunctions } from 'n8n-workflow';
import { Address, Operation, xdr } from 'soroban-client';
import { binascii } from './helpers/helpers';

export async function deployContract(this: IExecuteFunctions) {
	try {
		const account = this.getNodeParameter('account', 0) as string;
		let wasmHash = this.getNodeParameter('wasmHash', 0) as string;

		wasmHash = binascii.unhexlify(wasmHash);
		const wasmHashBuffer = Buffer.from(wasmHash, 'ascii');
		const salt = randomBytes(32);
		const buff = Buffer.from(salt);
		const addr = new Address(account);

		const contractIdPreimageFromAddress = new xdr.ContractIdPreimageFromAddress({
			address: addr.toScAddress(),
			salt: buff,
		});
		const contractIdPreimage = xdr.ContractIdPreimage.contractIdPreimageFromAddress(
			contractIdPreimageFromAddress,
		);

		const createContract = new xdr.CreateContractArgs({
			contractIdPreimage: contractIdPreimage,
			executable: xdr.ContractExecutable.contractExecutableWasm(wasmHashBuffer),
		});

		const hostFunction: xdr.HostFunction =
			xdr.HostFunction.hostFunctionTypeCreateContract(createContract);
		const operation: xdr.Operation = Operation.invokeHostFunction({
			func: hostFunction,
			auth: [],
		});

		return { operation: operation.toXDR('base64') };
	} catch (error) {
		throw new Error(error);
	}
}
