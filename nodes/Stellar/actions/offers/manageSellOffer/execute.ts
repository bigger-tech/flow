import { IExecuteFunctions } from 'n8n-workflow';
import { Operation, Asset } from 'stellar-sdk';
import { convertAmountToBigNumber } from '../../../../../common/utils/stellarBlockchain/convertAmountToBigNumber';
import IAsset from '../../../../../common/interfaces/stellarBlockchain/IAsset';
import { buildAsset } from '../../../../../common/utils/stellarBlockchain/buildAsset';
import { NetworkEnum } from '../../../../../common/enum/stellarBlockchain/networkEnum';

export async function manageSellOffer(this: IExecuteFunctions) {
	try {
		const { values: sellingAsset } = this.getNodeParameter('sellingAsset', 0) as IAsset;
		const { values: buyingAsset } = this.getNodeParameter('buyingAsset', 0) as IAsset;
		const sellingAmount = this.getNodeParameter('sellingAmount', 0) as number;
		const sellingPrice = this.getNodeParameter('price', 0) as number;

		const selling = buildAsset(sellingAsset, NetworkEnum.STELLAR) as Asset;
		const buying = buildAsset(buyingAsset, NetworkEnum.STELLAR) as Asset;
		const amount = convertAmountToBigNumber(sellingAmount);
		const price = convertAmountToBigNumber(sellingPrice);
		const offerId = this.getNodeParameter('offerId', 0) as string;

		const manageSellOfferOperation = Operation.manageSellOffer({
			selling,
			buying,
			amount,
			price,
			offerId,
		}).toXDR('base64');

		return { operation: manageSellOfferOperation };
	} catch (error) {
		throw new Error(error);
	}
}
