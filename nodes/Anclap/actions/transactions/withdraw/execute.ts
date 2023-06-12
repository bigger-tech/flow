import { IExecuteFunctions } from 'n8n-workflow';
import SEP24 from '../../../transport/SEP24';
import SEP6 from '../../../transport/SEP6';
import { AnclapAssetCode } from '../../../transport/responses/IAnclapInfoResponse';
import { buildWithdrawTransaction, verifyAmount } from '../../../transport/helpers';
import AnclapCredentials from '../../../transport/AnclapCredentials';
import stellar from '../../../transport/stellar';

export async function withdraw(this: IExecuteFunctions) {
	const anclapCredentials = new AnclapCredentials(await this.getCredentials('anclapApi'));
	const isInteractive = this.getNodeParameter('isInteractive', 0) as boolean;
	const token = this.getNodeParameter('token', 0) as string;
	const assetCode = this.getNodeParameter('assetCode', 0) as AnclapAssetCode;

	const getSep24WithdrawUrl = async () => {
		const sep24 = new SEP24(anclapCredentials, token);
		return await sep24.getWithdrawInteractiveUrl(assetCode);
	};

	const getSep6WithdrawInfo = async () => {
		const amount = this.getNodeParameter('amount', 0) as string;
		const type = this.getNodeParameter('type', 0) as string;
		const dest = this.getNodeParameter('dest', 0) as string;
		const sep6 = new SEP6(anclapCredentials, token);
		const info = await sep6.getInfo();
		const withdrawAsset = info.withdraw[assetCode];

		if (verifyAmount(withdrawAsset, amount)) {
			const withdraw = await sep6.withdraw({
				code: assetCode,
				type,
				dest,
				amount,
			});

			const transaction = await buildWithdrawTransaction(
				anclapCredentials.publicKey,
				withdraw,
				stellar[anclapCredentials.stellarNetwork].url,
				stellar[anclapCredentials.stellarNetwork].passphrase,
			);

			return { withdraw, transaction };
		} else {
			return { error: 'The amount is less than the min amount', withdrawAsset };
		}
	};

	if (isInteractive) {
		return await getSep24WithdrawUrl();
	} else {
		return await getSep6WithdrawInfo();
	}
}
