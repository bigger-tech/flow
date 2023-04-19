import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, LiquidityPoolAsset, Operation } from 'stellar-sdk';
import IAsset from '../../entities/IAsset';

export async function changeTrust(this: IExecuteFunctions) {
	try {
		const assetType = this.getNodeParameter('assetType', 0) as string;
		let asset;

		switch (assetType) {
			case 'asset':
				const assetToTrust = this.getNodeParameter('assetType', 0) as IAsset;
				asset = new Asset(assetToTrust.values.code, assetToTrust.values.issuer);
				break;

			case 'liquidityPool':
				let assetA;
				let assetB;
				const isAssetANative = this.getNodeParameter('isAssetANative', 0) as boolean;

				if (isAssetANative) {
					assetA = Asset.native();
				} else {
					const assetAValue = this.getNodeParameter('assetA', 0) as IAsset;
					assetA = new Asset(assetAValue.values.code, assetAValue.values.issuer);
				}
				const isAssetBNative = this.getNodeParameter('isAssetBNative', 0) as boolean;

				if (isAssetBNative) {
					assetB = Asset.native();
				} else {
					const assetBValue = this.getNodeParameter('assetA', 0) as IAsset;
					assetB = new Asset(assetBValue.values.code, assetBValue.values.issuer);
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
