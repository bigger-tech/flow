import { xdr } from 'soroban-client';
import { IExplorerContractResponse } from '../../../../../../common/interfaces/stellar/IExplorerContractResponse';

export async function getContractAbi(contractId: string) {
	/* Retrieves the ABI (Application Binary Interface) of a smart contract by its contract address.*/
	const EXPLORER_BASE_URL = 'https://api.stellarchain.io/v1';
	const response = await fetch(`${EXPLORER_BASE_URL}/contracts/${contractId}`);

	if (!response.ok) {
		throw new Error(`Failed to fetch contract with id ${contractId}`);
	}
	const data = (await response.json()) as IExplorerContractResponse;

	const abi = JSON.parse(data.wasmParsed);

	const methods: any[] = abi.specs
		.filter((spec: any) => spec.type === 'functionV0')
		.map((spec: any) => {
			const params = JSON.parse(spec.inputs);
			const outputs = JSON.parse(spec.outputs);

			return {
				name: spec.name,
				params: params.map((param: any) => ({
					name: param.name,
					type: param.type.type.value,
				})),
				outputs: outputs.map((param: any) => ({
					name: param.name,
					type: param.type.value,
				})),
			};
		});

	return methods;
}

export const transformABI = (abi: any): any[] => {
	const methods: any[] = abi.map((spec: any) => {
		const params = spec.params;
		return {
			name: spec.name,
			params: params.map((param: any) => ({
				name: param.name,
				type: getDataType(param.type),
			})),
			outputs: spec.outputs,
		};
	});

	return methods;
};

const getDataType = (value: number): string => {
	const type = scValtypes.find((x) => x.value === value);
	return (type && type.name) || xdr.ScValType.scvVoid().name;
};

const scValtypes: any[] = [
	xdr.ScValType.scvBool(),
	xdr.ScValType.scvVoid(),
	xdr.ScValType.scvError(),
	xdr.ScValType.scvU32(),
	xdr.ScValType.scvI32(),
	xdr.ScValType.scvU64(),
	xdr.ScValType.scvI64(),
	xdr.ScValType.scvTimepoint(),
	xdr.ScValType.scvDuration(),
	xdr.ScValType.scvU128(),
	xdr.ScValType.scvI128(),
	xdr.ScValType.scvU256(),
	xdr.ScValType.scvI256(),
	xdr.ScValType.scvBytes(),
	xdr.ScValType.scvString(),
	xdr.ScValType.scvSymbol(),
	xdr.ScValType.scvVec(),
	xdr.ScValType.scvMap(),
	xdr.ScValType.scvAddress(),
	xdr.ScValType.scvContractInstance(),
	xdr.ScValType.scvLedgerKeyContractInstance(),
	xdr.ScValType.scvLedgerKeyNonce(),
	{ value: 1006, name: 'scvBytes' },
];
