import { IExecuteFunctions } from 'n8n-workflow';
import { Operation, Asset } from '@stellar/stellar-sdk';
import IAsset from '../../../../../../common/interfaces/stellar/IAsset';
import { StellarPlatformEnum } from '../../../../../../common/enum/stellar/StellarPlatformEnum';
import { buildAsset } from '../../../../../../common/utils/stellar/buildAsset';

export function revokeTrustlineSponsorship(this: IExecuteFunctions) {
	try {
		const account = this.getNodeParameter('account', 0) as string;
		const { values: assetValues } = this.getNodeParameter('asset', 0) as IAsset;
		const asset = buildAsset(assetValues, StellarPlatformEnum.SOROBAN) as Asset;

		const revokeTrustlineSponsorshipOperation = Operation.revokeTrustlineSponsorship({
			account,
			asset,
		}).toXDR('base64');

		return { operation: revokeTrustlineSponsorshipOperation };
	} catch (error) {
		throw new Error(error);
	}
}
