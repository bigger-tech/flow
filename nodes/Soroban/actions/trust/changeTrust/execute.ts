import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Operation } from 'soroban-client';
import { convertAmountToBigNumber } from '../../../../../common/utils/stellar/convertAmountToBigNumber';
import IAsset from '../../../../../common/interfaces/stellar/IAsset';

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
