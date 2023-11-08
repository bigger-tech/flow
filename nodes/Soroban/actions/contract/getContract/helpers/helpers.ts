import { xdr } from 'soroban-client';
import { IExplorerContractResponse } from '../../../../../../common/interfaces/soroban/IExplorerContractResponse';

export async function getContractAbi(contractId: string) {
	const EXPLORER_BASE_URL = 'https://api.stellarchain.io/v1';
	const FUNCTION_TYPE = 'functionV0';
	const response = await fetch(`${EXPLORER_BASE_URL}/contracts/${contractId}`);

	if (!response.ok) {
		throw new Error(`Failed to fetch contract with id ${contractId}`);
	}
	const { wasmParsed } = (await response.json()) as IExplorerContractResponse;

	const { specs } = JSON.parse(wasmParsed);

	return specs
		.filter(({ type }: any) => type === FUNCTION_TYPE)
		.map(({ inputs, outputs, name }: any) => {
			const params: any = JSON.parse(inputs);
			const returns: any = JSON.parse(outputs);

			return {
				name: name,
				params: params.map(({ name, type }: any) => ({
					name: name,
					type: type.type.value,
				})),
				outputs: returns.map(({ name, type }: any) => ({
					name: name,
					type: type.value,
				})),
			};
		});
}

export const transformAbi = (abi: any): any[] => {
	return abi.map(({ params, name, outputs }: any) => {
		return {
			name: name,
			params: params.map(({ name, type }: any) => ({
				name: name,
				type: getDataType(type),
			})),
			outputs: outputs,
		};
	});
};

const getDataType = (value: number): string => {
	const type = scValtypes.find((x) => x.value === value);
	return (type && type.name) || xdr.ScValType.scvVoid().name;
};

const scValtypes: xdr.ScValType[] = [
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
];
