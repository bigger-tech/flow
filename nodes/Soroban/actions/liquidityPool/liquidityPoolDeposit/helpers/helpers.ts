import { convertAmountToBigNumber } from '../../../../../../common/utils/stellar/convertAmountToBigNumber';
import ILiquidityPoolPrice from '../../../../../../common/interfaces/stellar/ILiquidityPoolPrice';
import IPriceFraction from '../../../../../../common/interfaces/stellar/IPriceFraction';
import NoPriceSelectedError from '../../../../../../common/errors/stellar/NoPriceSelectedError';

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
