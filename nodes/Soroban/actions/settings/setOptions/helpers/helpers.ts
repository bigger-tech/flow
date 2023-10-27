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
	let totalFlags = 0;
	if (flags.authorizationRequired) totalFlags += AuthRequiredFlag;
	if (flags.authorizationRevocable) totalFlags += AuthRevocableFlag;
	if (flags.authorizationInmutable) totalFlags += AuthImmutableFlag;
	if (flags.authorizationClawbackEnabled) totalFlags += AuthClawbackEnabledFlag;
	return totalFlags as AuthFlag;
}

export function buildSigner(signerValues: ISigner['values']) {
	const signerType = signerValues.signerType;
	const signerKey = signerValues.signerKey;
	const weight = Number(signerValues.signerWeight);

	let signer: Signer;
	if (typeof signerKey != 'string' && signerType != 'ed25519PublicKey') {
		signerType === 'sha256Hash'
			? (signer = { sha256Hash: signerKey, weight })
			: (signer = { preAuthTx: signerKey, weight });
	} else {
		signer = { ed25519PublicKey: signerKey as string, weight };
	}
	return signer;
}
