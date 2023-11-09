export interface IContract {
	values: {
		contractType: ContractType;
		contractValue: string;
	};
}

export enum ContractType {
	contractId = 'contractId',
	contractAddress = 'contractAddress',
}
