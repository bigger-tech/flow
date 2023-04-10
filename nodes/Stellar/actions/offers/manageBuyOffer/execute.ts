import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Operation } from 'stellar-sdk';
import { convertAmountToBigNumber } from '../../../transport';
import IAsset from '../../entities/IAsset';

export async function manageBuyOffer(this: IExecuteFunctions) {
	const isSellingAssetNative = this.getNodeParameter('isSellingAssetNative', 0) as boolean;
	let selling: Asset;
	if (isSellingAssetNative) {
		selling = Asset.native();
	} else {
		const sellingAsset = this.getNodeParameter('sellingAsset', 0) as IAsset;
		selling = new Asset(sellingAsset.values.code, sellingAsset.values.issuer);
	}

	const isBuyingAssetNative = this.getNodeParameter('isBuyingAssetNative', 0) as boolean;
	let buying: Asset;
	if (isBuyingAssetNative) {
		buying = Asset.native();
	} else {
		const buyingAsset = this.getNodeParameter('buyingAsset', 0) as IAsset;
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
	});
	return { operation: manageBuyOfferOperation };
}
