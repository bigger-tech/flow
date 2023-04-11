import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Operation } from 'stellar-sdk';
import IAsset from '../../entities/IAsset';

export async function setTrustline(this: IExecuteFunctions) {
	const trustor = this.getNodeParameter('trustor', 0) as string;
	const assetToTrust = this.getNodeParameter('destinationAsset', 0) as IAsset;
	const asset = new Asset(assetToTrust.values.code, assetToTrust.values.issuer);
	const authorized = this.getNodeParameter('authorized', 0) as boolean;
	const authorizedToMaintainLiabilities = this.getNodeParameter(
		'authorizedToMaintainLiabilities',
		0,
	) as boolean;
	const clawbackEnabled = this.getNodeParameter('clawbackEnabled', 0) as boolean;

	const setTrustlineOperation = Operation.setTrustLineFlags({
		trustor,
		asset,
		flags: {
			authorized,
			authorizedToMaintainLiabilities,
			clawbackEnabled,
		},
	}).toXDR('base64');
	return { operation: setTrustlineOperation };
}
