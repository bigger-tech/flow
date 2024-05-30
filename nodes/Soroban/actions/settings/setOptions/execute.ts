import { IExecuteFunctions } from 'n8n-workflow';
import { Operation } from '@stellar/stellar-sdk';
import { buildFlags, buildSigner } from './helpers/helpers';
import IFlags from '../../../../../common/interfaces/stellar/IFlags';
import ISigner from '../../../../../common/interfaces/stellar/ISigner';
import ISetOptionsOperationOptions from '../../interfaces/ISetOptionsOperationOptions';

export async function setOptions(this: IExecuteFunctions) {
	try {
		const inflationDest = this.getNodeParameter('inflationDest', 0) as string;
		const { values: flagsToSet } = this.getNodeParameter('flagsToSet', 0) as IFlags;
		const { values: flagsToClear } = this.getNodeParameter('flagsToClear', 0) as IFlags;
		const masterWeight = this.getNodeParameter('masterWeight', 0) as string;
		const lowThreshold = this.getNodeParameter('lowThreshold', 0) as string;
		const medThreshold = this.getNodeParameter('medThreshold', 0) as string;
		const highThreshold = this.getNodeParameter('highThreshold', 0) as string;
		const homeDomain = this.getNodeParameter('homeDomain', 0) as string;
		const { values: signerValues } = this.getNodeParameter('signer', 0) as ISigner;

		const operationOptions: ISetOptionsOperationOptions = {
			...(inflationDest && { inflationDest }),
			...(flagsToSet && { setFlags: buildFlags(flagsToSet) }),
			...(flagsToClear && { clearFlags: buildFlags(flagsToClear) }),
			...(masterWeight && { masterWeight: Number(masterWeight) }),
			...(lowThreshold && { lowThreshold: Number(lowThreshold) }),
			...(medThreshold && { medThreshold: Number(medThreshold) }),
			...(highThreshold && { highThreshold: Number(highThreshold) }),
			...(homeDomain && { homeDomain }),
			...(signerValues && { signer: buildSigner(signerValues) }),
		};

		const setOptionsOperation = Operation.setOptions(operationOptions).toXDR('base64');

		return { operation: setOptionsOperation };
	} catch (error) {
		throw new Error(error);
	}
}
