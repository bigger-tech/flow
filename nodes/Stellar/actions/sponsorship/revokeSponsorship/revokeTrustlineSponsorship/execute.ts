import { IExecuteFunctions } from 'n8n-workflow';
import { Operation, Asset } from 'stellar-sdk';
import IAsset from '../../../../../../common/interfaces/stellarBlockchain/IAsset';
import { NetworkEnum } from '../../../../../../common/enum/stellarBlockchain/networkEnum';
import { buildAsset } from '../../../../../../common/utils/stellarBlockchain/buildAsset';

export async function revokeTrustlineSponsorship(this: IExecuteFunctions) {
	try {
		const account = this.getNodeParameter('account', 0) as string;
		const { values: assetValues } = this.getNodeParameter('asset', 0) as IAsset;
		const asset = buildAsset(assetValues, NetworkEnum.STELLAR) as Asset;

		const revokeTrustlineSponsorshipOperation = Operation.revokeTrustlineSponsorship({
			account,
			asset,
		}).toXDR('base64');
		return { operation: revokeTrustlineSponsorshipOperation };
	} catch (error) {
		throw new Error(error);
	}
}
