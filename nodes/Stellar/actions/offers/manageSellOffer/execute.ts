import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Operation } from 'stellar-sdk';
import { convertAmountToBigNumber } from '../../../transport';
import IAsset from '../../entities/IAsset';

export async function manageSellOffer(this: IExecuteFunctions) {
	const isSellingAssetNative = this.getNodeParameter('isSellingAssetNative', 0) as boolean;
	let selling: Asset;
	if (isSellingAssetNative) {
		selling = Asset.native();
	} else {
		const asset = this.getNodeParameter('sellingAsset', 0) as IAsset;
		selling = new Asset(asset.sellingAsset.code, asset.sellingAsset.issuer);
	}

	const isBuyingAssetNative = this.getNodeParameter('isBuyingAssetNative', 0) as boolean;
	let buying: Asset;
	if (isBuyingAssetNative) {
		buying = Asset.native();
	} else {
		const asset = this.getNodeParameter('buyingAsset', 0) as IAsset;
		buying = new Asset(asset.buyingAsset.code, asset.buyingAsset.issuer);
	}

	const sellingAmount = this.getNodeParameter('sellingAmount', 0) as number;
	const amount = convertAmountToBigNumber(sellingAmount);

	const sellingPrice = this.getNodeParameter('price', 0) as number;
	const price = convertAmountToBigNumber(sellingPrice);

	const offerId = this.getNodeParameter('offerId', 0) as string;

	const manageSellOfferOperation = Operation.manageSellOffer({
		selling,
		buying,
		amount,
		price,
		offerId,
	});
	return { manageSellOfferOperation: manageSellOfferOperation };
}
