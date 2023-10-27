import { convertAmountToBigNumber } from '../../../../../../common/utils/stellar/convertAmountToBigNumber';
import ILiquidityPoolPrice from '../../../../../../common/interfaces/stellar/ILiquidityPoolPrice';
import IPriceFraction from '../../../../../../common/interfaces/stellar/IPriceFraction';
import NoPriceSelectedError from '../../../../../../common/errors/stellar/NoPriceSelectedError';

export default function getPrice(price: ILiquidityPoolPrice['values']): string | IPriceFraction {
	const { isPriceAFraction, priceNumerator, priceDenominator, priceNumber } = price;

	if (isPriceAFraction && priceNumerator && priceDenominator) {
		return {
			n: convertAmountToBigNumber(priceNumerator),
			d: convertAmountToBigNumber(priceDenominator),
		};
	}

	if (priceNumber) {
		return convertAmountToBigNumber(priceNumber);
	}
	throw new NoPriceSelectedError();
}
