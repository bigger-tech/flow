import { IExecuteFunctions } from 'n8n-workflow';
import { Operation, Asset } from '@stellar/stellar-sdk';
import IAsset from '../../../../../common/interfaces/stellar/IAsset';
import { StellarPlatformEnum } from '../../../../../common/enum/stellar/StellarPlatformEnum';
import { buildAsset } from '../../../../../common/utils/stellar/buildAsset';

export async function setTrustline(this: IExecuteFunctions) {
	try {
		const trustor = this.getNodeParameter('trustor', 0) as string;
		const { values: assetToTrust } = this.getNodeParameter('trustAsset', 0) as IAsset;
		const authorized = this.getNodeParameter('authorized', 0) as boolean;
		const authorizedToMaintainLiabilities = this.getNodeParameter(
			'authorizedToMaintainLiabilities',
			0,
		) as boolean;
		const clawbackEnabled = this.getNodeParameter('clawbackEnabled', 0) as boolean;

		const asset = buildAsset(assetToTrust, StellarPlatformEnum.SOROBAN) as Asset;

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
