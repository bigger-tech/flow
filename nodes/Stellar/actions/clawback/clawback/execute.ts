import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Operation } from 'stellar-sdk';
import { checkAsset, convertAmountToBigNumber } from '../../../transport';
import IAsset from '../../entities/IAsset';

export async function clawback(this: IExecuteFunctions) {
	try {
		const from = this.getNodeParameter('from', 0) as string;
		const assetToBurn = this.getNodeParameter('assetToBurn', 0) as IAsset;
		const amountToBurn = this.getNodeParameter('amount', 0) as number;
		let asset: Asset;
		checkAsset(assetToBurn);
		if (assetToBurn.values.isNative) {
			asset = Asset.native();
		} else {
			asset = new Asset(assetToBurn.values.code, assetToBurn.values.issuer);
		}

		const amount = convertAmountToBigNumber(amountToBurn);
		const clawbackOperation = Operation.clawback({ asset, amount, from }).toXDR('base64');
		return { operation: clawbackOperation };
	} catch (error) {
		throw new Error(error);
	}
}
