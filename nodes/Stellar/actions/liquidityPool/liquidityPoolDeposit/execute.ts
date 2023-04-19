import { IExecuteFunctions } from 'n8n-workflow';
import { Operation } from 'stellar-sdk';
import { convertAmountToBigNumber } from '../../../transport';
import ILiquidtyPoolPrice from '../../entities/ILiquidtyPoolPrice';
import IPriceFraction from '../../entities/IPriceFraction';

export async function liquidityPoolDeposit(this: IExecuteFunctions) {
	try {
		const liquidityPoolId = this.getNodeParameter('liquidityPoolId', 0) as string;

		const maxAmountAToDeposit = this.getNodeParameter('maxAmountA', 0) as number;
		const maxAmountA = convertAmountToBigNumber(maxAmountAToDeposit);
		const maxAmountBToDeposit = this.getNodeParameter('maxAmountA', 0) as number;
		const maxAmountB = convertAmountToBigNumber(maxAmountBToDeposit);

		let minPrice: string | ILiquidtyPoolPrice;
		const isMinPriceAFraction = this.getNodeParameter('isMinPriceAFraction', 0) as boolean;
		if (isMinPriceAFraction) {
			const minPriceFraction = this.getNodeParameter('minPriceFraction', 0) as IPriceFraction;
			minPrice = {
				n: convertAmountToBigNumber(minPriceFraction.values.numerator),
				d: convertAmountToBigNumber(minPriceFraction.values.denominator),
			};
		} else {
			const minPriceNumber = this.getNodeParameter('minPriceNumber', 0) as number;
			minPrice = convertAmountToBigNumber(minPriceNumber);
		}

		let maxPrice: string | ILiquidtyPoolPrice;
		const isMaxPriceAFraction = this.getNodeParameter('isMinPriceAFraction', 0) as boolean;
		if (isMaxPriceAFraction) {
			const minPriceFraction = this.getNodeParameter('minPriceFraction', 0) as IPriceFraction;
			maxPrice = {
				n: convertAmountToBigNumber(minPriceFraction.values.numerator),
				d: convertAmountToBigNumber(minPriceFraction.values.denominator),
			};
		} else {
			const minPriceNumber = this.getNodeParameter('minPriceNumber', 0) as number;
			maxPrice = convertAmountToBigNumber(minPriceNumber);
		}

		const liquidityPoolDepositOperation = Operation.liquidityPoolDeposit({
			liquidityPoolId,
			maxAmountA,
			maxAmountB,
			minPrice,
			maxPrice,
		}).toXDR('base64');

		return { operation: liquidityPoolDepositOperation };
	} catch (error) {
		throw new Error(error);
	}
}
