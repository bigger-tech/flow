import { IExecuteFunctions } from 'n8n-workflow';
import { Operation, Asset } from 'stellar-sdk';
import IAsset from '../../../../../common/interfaces/stellarBlockchain/IAsset';
import { NetworkEnum } from '../../../../../common/enum/stellarBlockchain/networkEnum';
import { buildAsset } from '../../../../../common/utils/stellarBlockchain/buildAsset';

export async function setTrustline(this: IExecuteFunctions) {
	try {
		const trustor = this.getNodeParameter('trustor', 0) as string;
		const { values: assetToTrust } = this.getNodeParameter('destinationAsset', 0) as IAsset;
		const authorized = this.getNodeParameter('authorized', 0) as boolean;
		const authorizedToMaintainLiabilities = this.getNodeParameter(
			'authorizedToMaintainLiabilities',
			0,
		) as boolean;
		const clawbackEnabled = this.getNodeParameter('clawbackEnabled', 0) as boolean;

		const asset = buildAsset(assetToTrust, NetworkEnum.STELLAR) as Asset;

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
	} catch (error) {
		throw new Error(error);
	}
}
