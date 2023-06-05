import { DepositAsset, WithdrawAsset } from './responses/IAnclapInfoResponse';

export function verifyAmount(asset: DepositAsset | WithdrawAsset, amount: string) {
	const minAmount = asset.min_amount;
	const parsedAmount = Number(amount);
	return parsedAmount >= minAmount;
}
