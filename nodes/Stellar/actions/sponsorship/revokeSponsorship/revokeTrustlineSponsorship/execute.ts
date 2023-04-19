import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Operation } from 'stellar-sdk';
import IAsset from '../../../entities/IAsset';

export async function revokeTrustlineSponsorship(this: IExecuteFunctions) {
	const account = this.getNodeParameter('account', 0) as string;
	const isNative = this.getNodeParameter('isNative', 0) as boolean;

	let asset: Asset;

	if (isNative) {
		asset = Asset.native();
	} else {
		const destinationAsset = this.getNodeParameter('destinationAsset', 0) as IAsset;
		asset = new Asset(destinationAsset.values.code, destinationAsset.values.issuer);
	}
	const revokeTrustlineSponsorshipOperation = Operation.revokeTrustlineSponsorship({
		account,
		asset,
	}).toXDR('base64');
	return { operation: revokeTrustlineSponsorshipOperation };
}
