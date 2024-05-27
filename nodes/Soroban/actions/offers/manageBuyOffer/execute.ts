import { IExecuteFunctions } from 'n8n-workflow';
import { Operation, Asset } from '@stellar/stellar-sdk';
import { convertAmountToBigNumber } from '../../../../../common/utils/stellar/convertAmountToBigNumber';
import IAsset from '../../../../../common/interfaces/stellar/IAsset';
import { buildAsset } from '../../../../../common/utils/stellar/buildAsset';

export function manageBuyOffer(this: IExecuteFunctions) {
	try {
		const { values: sellingAsset } = this.getNodeParameter('sellingAsset', 0) as IAsset;
		const { values: buyingAsset } = this.getNodeParameter('buyingAsset', 0) as IAsset;
		const sellingAmount = this.getNodeParameter('buyingAmount', 0) as number;
		const sellingPrice = this.getNodeParameter('price', 0) as number;
		const offerId = this.getNodeParameter('offerId', 0) as string;

		const selling = buildAsset(sellingAsset) as Asset;
		const buying = buildAsset(buyingAsset) as Asset;
		const buyAmount = convertAmountToBigNumber(sellingAmount);
		const price = convertAmountToBigNumber(sellingPrice);

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
