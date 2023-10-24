import { convertAmountToBigNumber } from '../../../../../../common/utils/stellarBlockchain/convertAmountToBigNumber';
import ILiquidityPoolPrice from '../../../../../../common/interfaces/stellarBlockchain/ILiquidityPoolPrice';
import IPriceFraction from '../../../../../../common/interfaces/stellarBlockchain/IPriceFraction';
import NoPriceSelectedError from '../errors/NoPriceSelectedError';

export default function getPrice(price: ILiquidityPoolPrice['values']): string | IPriceFraction {
	if (price.isPriceAFraction && price.priceNumerator && price.priceDenominator) {
		return {
			n: convertAmountToBigNumber(price.priceNumerator),
			d: convertAmountToBigNumber(price.priceDenominator),
		};
	}
	if (price.priceNumber) {
		return convertAmountToBigNumber(price.priceNumber);
	}
	throw new NoPriceSelectedError();
}
