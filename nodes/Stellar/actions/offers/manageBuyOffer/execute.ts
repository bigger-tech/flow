import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Operation } from 'stellar-sdk';
import { checkAsset, convertAmountToBigNumber } from '../../../transport';
import IAsset from '../../entities/IAsset';

export async function manageBuyOffer(this: IExecuteFunctions) {
	try {
		const sellingAsset = this.getNodeParameter('sellingAsset', 0) as IAsset;
		checkAsset(sellingAsset);
		let selling: Asset;
		if (sellingAsset.values.isNative) {
			selling = Asset.native();
		} else {
			selling = new Asset(sellingAsset.values.code, sellingAsset.values.issuer);
		}

		const buyingAsset = this.getNodeParameter('buyingAsset', 0) as IAsset;
		checkAsset(buyingAsset);
		let buying: Asset;
		if (buyingAsset.values.isNative) {
			buying = Asset.native();
		} else {
			buying = new Asset(buyingAsset.values.code, buyingAsset.values.issuer);
		}

		const sellingAmount = this.getNodeParameter('buyingAmount', 0) as number;
		const buyAmount = convertAmountToBigNumber(sellingAmount);

		const sellingPrice = this.getNodeParameter('price', 0) as number;
		const price = convertAmountToBigNumber(sellingPrice);

		const offerId = this.getNodeParameter('offerId', 0) as string;

		const manageBuyOfferOperation = Operation.manageBuyOffer({
			selling,
			buying,
			buyAmount,
			price,
			offerId,
		}).toXDR('base64');
		return { operation: manageBuyOfferOperation };
	} catch (error) {
		throw new Error(error);
	}
}
