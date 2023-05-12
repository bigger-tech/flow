import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, LiquidityPoolAsset, Operation } from 'stellar-sdk';
import { checkAsset, convertAmountToBigNumber } from '../../../transport';
import IAsset from '../../entities/IAsset';

export async function changeTrust(this: IExecuteFunctions) {
	try {
		const assetType = this.getNodeParameter('assetType', 0) as string;
		let asset;

		switch (assetType) {
			case 'asset':
				const assetToTrust = this.getNodeParameter('asset', 0) as IAsset;
				asset = new Asset(assetToTrust.values.code, assetToTrust.values.issuer);
				break;

			case 'liquidityPool':
				let assetA;
				let assetB;

				const assetAValues = this.getNodeParameter('assetA', 0) as IAsset;
				checkAsset(assetAValues);
				if (assetAValues.values.isNative) {
					assetA = Asset.native();
				} else {
					assetA = new Asset(assetAValues.values.code, assetAValues.values.issuer);
				}

				const assetBValues = this.getNodeParameter('assetB', 0) as IAsset;
				checkAsset(assetBValues);
				if (assetBValues.values.isNative) {
					assetB = Asset.native();
				} else {
					assetB = new Asset(assetBValues.values.code, assetBValues.values.issuer);
				}

				const fee = this.getNodeParameter('fee', 0) as number;
				asset = new LiquidityPoolAsset(assetA, assetB, fee);
				break;

			default:
				asset = Asset.native();
		}
		const limit = this.getNodeParameter('trustLimit', 0) as string;

		const changeTrustOperation = Operation.changeTrust({
			asset,
			limit,
		}).toXDR('base64');
		return { operation: changeTrustOperation };
	} catch (error) {
		throw new Error(error);
	}
}
