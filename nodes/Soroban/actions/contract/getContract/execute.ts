import { ContractType } from './../../../../../common/interfaces/soroban/IContract';
import { IExecuteFunctions } from 'n8n-workflow';
import { IContract } from '../../../../../common/interfaces/soroban/IContract';
import { getContractAbi, getContractAddress } from './helpers/helpers';
import { SorobanNetwork } from '../../../transport';
import { Server } from 'soroban-client';

export async function getContract(this: IExecuteFunctions) {
	const stellarNetwork = await SorobanNetwork.setNetwork.call(this);
	const server = new Server(stellarNetwork.url);

	const {
		values: { contractType, contractValue },
	} = this.getNodeParameter('contract', 0) as IContract;

	const contractAddress =
		contractType === ContractType.contractId ? getContractAddress(contractValue) : contractValue;

	return await getContractAbi(contractAddress, server);
}
