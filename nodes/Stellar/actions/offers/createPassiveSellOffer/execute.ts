import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Operation } from 'stellar-sdk';
import { convertAmountToBigNumber } from '../../../transport';
import IAsset from '../../entities/IAsset';

export async function createPassiveSellOffer(this: IExecuteFunctions) {
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

	const sellingAmount = this.getNodeParameter('sellingAmount', 0) as number;
	const amount = convertAmountToBigNumber(sellingAmount);

	const sellingPrice = this.getNodeParameter('price', 0) as number;
	const price = convertAmountToBigNumber(sellingPrice);

	const createPassiveSellOfferOperation = Operation.createPassiveSellOffer({
		selling,
		buying,
		amount,
		price,
	});
	return { operation: createPassiveSellOfferOperation };
}