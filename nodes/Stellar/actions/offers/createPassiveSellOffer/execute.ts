import { IExecuteFunctions } from 'n8n-workflow';
import { Operation, Asset } from '@stellar/stellar-sdk';
import { convertAmountToBigNumber } from '../../../../../common/utils/stellar/convertAmountToBigNumber';
import IAsset from '../../../../../common/interfaces/stellar/IAsset';
import { buildAsset } from '../../../../../common/utils/stellar/buildAsset';

export async function createPassiveSellOffer(this: IExecuteFunctions) {
	try {
		const { values: sellingAsset } = this.getNodeParameter('sellingAsset', 0) as IAsset;
		const { values: buyingAsset } = this.getNodeParameter('buyingAsset', 0) as IAsset;
		const sellingAmount = this.getNodeParameter('sellingAmount', 0) as number;
		const sellingPrice = this.getNodeParameter('price', 0) as number;

		const selling = buildAsset(sellingAsset) as Asset;
		const buying = buildAsset(buyingAsset) as Asset;
		const amount = convertAmountToBigNumber(sellingAmount);
		const price = convertAmountToBigNumber(sellingPrice);

		const createPassiveSellOfferOperation = Operation.createPassiveSellOffer({
			selling,
			buying,
			amount,
			price,
		}).toXDR('base64');

		return { operation: createPassiveSellOfferOperation };
	} catch (error) {
		throw new Error(error);
	}
}
