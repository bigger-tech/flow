import { convertAmountToBigNumber } from '../../../../transport';
import ILiquidityPoolPrice from '../../../entities/ILiquidityPoolPrice';
import IPriceFraction from '../../../entities/IPriceFraction';
import NoPriceSelectedError from '../errors/NoPriceSelectedError';

export default function getPrice(priceValues: ILiquidityPoolPrice['values']) {
	let price: string | IPriceFraction;
	if (priceValues.isPriceAFraction && priceValues.priceNumerator && priceValues.priceDenominator) {
		price = {
			n: convertAmountToBigNumber(priceValues.priceNumerator),
			d: convertAmountToBigNumber(priceValues.priceDenominator),
		};
	} else if (priceValues.priceNumber) {
		price = convertAmountToBigNumber(priceValues.priceNumber);
	} else {
		throw new NoPriceSelectedError();
	}
	return price;
}
