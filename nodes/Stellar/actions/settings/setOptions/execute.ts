import { IExecuteFunctions } from 'n8n-workflow';
import {
	Operation,
	AuthClawbackEnabledFlag,
	AuthRequiredFlag,
	AuthRevocableFlag,
	AuthImmutableFlag,
	Signer,
	AuthFlag,
} from 'stellar-sdk';
import ISetOptionsOperationOptions from '../../entities/ISetOptionsOperationOptions';

export async function setOptions(this: IExecuteFunctions) {
	try {
		let operationOptions: ISetOptionsOperationOptions = {};
		const inflationDest = this.getNodeParameter('inflationDest', 0) as string;
		if (inflationDest) operationOptions.inflationDest = inflationDest;

		const flagsToSet = this.getNodeParameter('flagsToSet', 0) as any;
		if (flagsToSet.values) {
			let flags = 0;
			if (flagsToSet.values.authorizationRequired) flags += AuthRequiredFlag;
			if (flagsToSet.values.authorizationRevocable) flags += AuthRevocableFlag;
			if (flagsToSet.values.authorizationInmutable) flags += AuthImmutableFlag;
			if (flagsToSet.values.authorizationClawbackEnabled) flags += AuthClawbackEnabledFlag;
			operationOptions.setFlags = flags as AuthFlag;
		}

		const flagsToClear = this.getNodeParameter('flagsToClear', 0) as any;
		if (flagsToClear.values) {
			let flags = 0;
			if (flagsToClear.values.authorizationRequired) flags += AuthRequiredFlag;
			if (flagsToClear.values.authorizationRevocable) flags += AuthRevocableFlag;
			if (flagsToClear.values.authorizationClawbackEnabled) flags += AuthClawbackEnabledFlag;
			operationOptions.clearFlags = flags as AuthFlag;
		}

		const masterWeight = this.getNodeParameter('masterWeight', 0) as string;
		if (masterWeight) operationOptions.masterWeight = Number(masterWeight);

		const lowThreshold = this.getNodeParameter('lowThreshold', 0) as string;
		if (lowThreshold) operationOptions.lowThreshold = Number(lowThreshold);

		const medThreshold = this.getNodeParameter('medThreshold', 0) as string;
		if (medThreshold) operationOptions.medThreshold = Number(medThreshold);

		const highThreshold = this.getNodeParameter('highThreshold', 0) as string;
		if (highThreshold) operationOptions.highThreshold = Number(highThreshold);

		const homeDomain = this.getNodeParameter('homeDomain', 0) as string;
		if (homeDomain) operationOptions.homeDomain = homeDomain;

		const signerInfo = this.getNodeParameter('signer', 0) as any;
		if (signerInfo) {
			const signerType = signerInfo.values.signerType;
			const signerKey = signerInfo.values.signerKey;
			const weight = signerInfo.values.signerWeight;
			let signer: Signer;
			switch (signerType) {
				case 'ed25519PublicKey':
					signer = { ed25519PublicKey: signerKey, weight };
					break;
				case 'sha256Hash':
					signer = { sha256Hash: signerKey, weight };
					break;
				case 'preAuthTx':
					signer = { preAuthTx: signerKey, weight };
					break;
				default:
					signer = { ed25519PublicKey: signerKey, weight };
			}
			operationOptions.signer = signer;
		}

		const setOptionsOperation = Operation.setOptions(operationOptions).toXDR('base64');
		return { operation: setOptionsOperation };
	} catch (error) {
		throw new Error(error);
	}
}
