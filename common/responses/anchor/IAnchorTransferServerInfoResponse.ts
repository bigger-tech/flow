import { DepositAssetType } from '../../types/anchor/DepositAssetType';
import { WithdrawAssetType } from '../../types/anchor/WithdrawAssetType';

export default interface IAnchorTransferServerInfoResponse {
	deposit: { [key in string]: DepositAssetType };
	withdraw: { [key in string]: WithdrawAssetType };
}
