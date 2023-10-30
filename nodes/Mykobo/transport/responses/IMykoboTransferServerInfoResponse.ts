export default interface IMykoboTransferServerInfoResponse {
	deposit: { [key in MykoboAssetCode]: DepositAsset };
	withdraw: { [key in MykoboAssetCode]: WithdrawAsset };
}

export type MykoboAssetCode = 'EURC';

export type DepositAsset = {
	enabled: boolean;
	authentication_required: boolean;
	min_amount: number;
	max_amount: number;
	fee_fixed: number;
	fee_percent: number;
};

export type WithdrawAsset = {
	enabled: boolean;
	authentication_required: boolean;
	min_amount: number;
	max_amount: number;
	fee_fixed: number;
	fee_percent: number;
};
