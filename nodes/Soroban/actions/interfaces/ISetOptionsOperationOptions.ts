import { AuthFlag, Signer } from 'soroban-client';

export default interface ISetOptionsOperationOptions {
	inflationDest?: string;
	clearFlags?: AuthFlag | undefined;
	setFlags?: AuthFlag | undefined;
	masterWeight?: number;
	lowThreshold?: number;
	medThreshold?: number;
	highThreshold?: number;
	homeDomain?: string;
	signer?: Signer;
}
