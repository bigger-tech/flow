import {
	AuthClawbackEnabledFlag,
	AuthRequiredFlag,
	AuthRevocableFlag,
	AuthImmutableFlag,
	Signer,
	AuthFlag,
} from 'soroban-client';
import IFlags from '../../../../../../common/interfaces/stellar/IFlags';
import ISigner from '../../../../../../common/interfaces/stellar/ISigner';

export function buildFlags(flags: IFlags['values']): AuthFlag {
	const {
		authorizationRequired,
		authorizationRevocable,
		authorizationInmutable,
		authorizationClawbackEnabled,
	} = flags;

	let totalFlags = 0;

	if (authorizationRequired) totalFlags += AuthRequiredFlag;
	if (authorizationRevocable) totalFlags += AuthRevocableFlag;
	if (authorizationInmutable) totalFlags += AuthImmutableFlag;
	if (authorizationClawbackEnabled) totalFlags += AuthClawbackEnabledFlag;

	return totalFlags as AuthFlag;
}

export function buildSigner(signerValues: ISigner['values']) {
	const { signerType, signerKey, signerWeight } = signerValues;
	const weight = Number(signerWeight);

	if (typeof signerKey != 'string' && signerType != 'ed25519PublicKey') {
		const signerData =
			signerType === 'sha256Hash'
				? { sha256Hash: signerKey, weight }
				: { preAuthTx: signerKey, weight };

		return signerData as Signer;
	}

	return { ed25519PublicKey: signerKey as string, weight } as Signer;
}
