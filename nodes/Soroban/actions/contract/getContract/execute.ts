import { ContractType } from './../../../../../common/interfaces/soroban/IContract';
import { IExecuteFunctions } from 'n8n-workflow';
import { IContract } from '../../../../../common/interfaces/soroban/IContract';
import { getContractAbi, getContractAddress } from './helpers/helpers';
import { SorobanNetwork } from '../../../transport';
import { SorobanRpc } from '@stellar/stellar-sdk';

export async function getContract(this: IExecuteFunctions) {
	const { url } = await SorobanNetwork.setNetwork.call(this);
	const server = new SorobanRpc.Server(url);

	const {
		values: { contractType, contractValue },
	} = this.getNodeParameter('contract', 0) as IContract;

	const contractAddress =
		contractType === ContractType.contractId ? getContractAddress(contractValue) : contractValue;

	return await getContractAbi(contractAddress, server);
}
