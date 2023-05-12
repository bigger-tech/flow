import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Operation } from 'stellar-sdk';
import { checkAsset } from '../../../../transport';
import IAsset from '../../../entities/IAsset';

export async function revokeTrustlineSponsorship(this: IExecuteFunctions) {
	try {
		const account = this.getNodeParameter('account', 0) as string;
		const assetValues = this.getNodeParameter('asset', 0) as IAsset;
		let asset: Asset;

		checkAsset(assetValues);
		if (assetValues.values.isNative) {
			asset = Asset.native();
		} else {
			asset = new Asset(assetValues.values.code, assetValues.values.issuer);
		}

		const revokeTrustlineSponsorshipOperation = Operation.revokeTrustlineSponsorship({
			account,
			asset,
		}).toXDR('base64');
		return { operation: revokeTrustlineSponsorshipOperation };
	} catch (error) {
		throw new Error(error);
	}
}
