import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, LiquidityPoolAsset, Operation } from 'stellar-sdk';
import { convertAmountToBigNumber } from '../../../../../common/utils/stellar/convertAmountToBigNumber';
import IAsset from '../../../../../common/interfaces/stellar/IAsset';
import { StellarPlatformEnum } from '../../../../../common/enum/stellar/StellarPlatformEnum';
import { buildAsset } from '../../../../../common/utils/stellar/buildAsset';

export async function changeTrust(this: IExecuteFunctions) {
	try {
		const assetType = this.getNodeParameter('assetType', 0) as string;
		const trustLimit = this.getNodeParameter('trustLimit', 0) as string;
		let asset;

		switch (assetType) {
			case 'asset':
				const assetToTrust = this.getNodeParameter('trustAsset', 0) as IAsset;
				asset = new Asset(assetToTrust.values.code, assetToTrust.values.issuer);
				break;

			case 'liquidityPool':
				const { values: assetAValues } = this.getNodeParameter('assetA', 0) as IAsset;
				const { values: assetBValues } = this.getNodeParameter('assetB', 0) as IAsset;
				const fee = this.getNodeParameter('fee', 0) as number;

				const assetA = buildAsset(assetAValues, StellarPlatformEnum.STELLAR_CLASSIC) as Asset;
				const assetB = buildAsset(assetBValues, StellarPlatformEnum.STELLAR_CLASSIC) as Asset;

				asset = new LiquidityPoolAsset(assetA, assetB, fee);
				break;

			default:
				asset = Asset.native();
		}
		const limit = trustLimit ? convertAmountToBigNumber(Number(trustLimit)) : undefined;

		const changeTrustOperation = Operation.changeTrust({
			asset,
			limit,
		}).toXDR('base64');

		return { operation: changeTrustOperation };
	} catch (error) {
		throw new Error(error);
	}
}
