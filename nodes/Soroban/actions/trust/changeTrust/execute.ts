import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Operation } from '@stellar/stellar-sdk';
import { convertAmountToBigNumber } from '../../../../../common/utils/stellar/convertAmountToBigNumber';
import IAsset from '../../../../../common/interfaces/stellar/IAsset';

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
