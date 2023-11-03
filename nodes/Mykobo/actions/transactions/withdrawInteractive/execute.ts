import { IExecuteFunctions } from 'n8n-workflow';
import AnchorCredentials from '../../../../../common/repository/anchor/AnchorCredentials';
import SEP24 from '../../../../../common/repository/anchor/SEP24';
import IWithdrawRequest from '../../../../../common/requests/anchor/WithdrawRequest/IWithdrawRequest';
import WithdrawRequest from '../../../../../common/requests/anchor/WithdrawRequest/WithdrawRequest';

export async function withdrawInteractive(this: IExecuteFunctions) {
	const mykoboCredentials = new AnchorCredentials(await this.getCredentials('mykoboApi'));
	const token = this.getNodeParameter('token', 0) as string;

	const assetCode = this.getNodeParameter('assetCode', 0) as string;
	const amount = this.getNodeParameter('amount', 0) as string;
	const type = this.getNodeParameter('type', 0) as string;
	const dest = this.getNodeParameter('dest', 0) as string;

	const showOptionalValues = this.getNodeParameter('showOptionalValues', 0) as boolean;

	const getSep6WithdrawInteractiveUrl = async () => {
		const sep24 = new SEP24(mykoboCredentials, token);

		let withdrawRequest: IWithdrawRequest;

		if (showOptionalValues) {
			const destExtra = this?.getNodeParameter('destExtra', 0) as string;
			const memo = this?.getNodeParameter('memo', 0) as string;
			const memoType = this?.getNodeParameter('memoType', 0) as string;
			const refundMemo = this?.getNodeParameter('refundMemo', 0) as string;
			const refundMemoType = this?.getNodeParameter('refundMemoType', 0) as string;
			const walletName = this?.getNodeParameter('walletName', 0) as string;
			const walletUrl = this?.getNodeParameter('walletUrl', 0) as string;
			const lang = this?.getNodeParameter('lang', 0) as string;
			const onChangeCallback = this?.getNodeParameter('onChangeCallback', 0) as string;
			const countryCode = this?.getNodeParameter('countryCode', 0) as string;
			const dest = this.getNodeParameter('dest', 0) as string;

			withdrawRequest = new WithdrawRequest({
				assetCode,
				dest,
				amount,
				memoType,
				memo,
				type,
				walletName,
				walletUrl,
				lang,
				onChangeCallback,
				countryCode,
				destExtra,
				refundMemo,
				refundMemoType,
			});
		} else {
			withdrawRequest = new WithdrawRequest({
				assetCode,
				dest,
				amount,
				type,
			});
		}
		return await sep24.getWithdrawInteractiveUrl(withdrawRequest);
	};
	return await getSep6WithdrawInteractiveUrl();
}
