import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, LiquidityPoolAsset, Operation } from '@stellar/stellar-sdk';
import { convertAmountToBigNumber } from '../../../../../common/utils/stellar/convertAmountToBigNumber';
import IAsset from '../../../../../common/interfaces/stellar/IAsset';
import { buildAsset } from '../../../../../common/utils/stellar/buildAsset';

export async function changeTrust(this: IExecuteFunctions) {
	try {
		const assetType = this.getNodeParameter('assetType', 0) as string;
		const trustLimit = this.getNodeParameter('trustLimit', 0) as string;
		let asset;

		switch (assetType) {
			case 'asset':
				const {
					values: { code, issuer },
				} = this.getNodeParameter('trustAsset', 0) as IAsset;
				asset = new Asset(code, issuer);
				break;

			case 'liquidityPool':
				const { values: assetAValues } = this.getNodeParameter('assetA', 0) as IAsset;
				const { values: assetBValues } = this.getNodeParameter('assetB', 0) as IAsset;
				const fee = this.getNodeParameter('fee', 0) as number;

				const assetA = buildAsset(assetAValues) as Asset;
				const assetB = buildAsset(assetBValues) as Asset;

				asset = new LiquidityPoolAsset(assetA, assetB, fee);
				break;

			default:
				asset = Asset.native();
		}

		let changeTrustOperation;

		if (trustLimit) {
			const limit = convertAmountToBigNumber(Number(trustLimit));

			changeTrustOperation = Operation.changeTrust({
				asset,
				limit,
			}).toXDR('base64');
		} else {
			changeTrustOperation = Operation.changeTrust({
				asset,
			}).toXDR('base64');
		}
		return { operation: changeTrustOperation };
	} catch (error) {
		throw new Error(error);
	}
}
