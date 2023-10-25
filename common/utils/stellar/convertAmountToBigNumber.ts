import BigNumber from 'bignumber.js';

export function convertAmountToBigNumber(amount: number): string {
	return new BigNumber(amount).toFixed(7).toString();
}
