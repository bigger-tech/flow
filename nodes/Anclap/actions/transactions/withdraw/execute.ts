import { IExecuteFunctions } from 'n8n-workflow';
import { getAnclapToml } from '../../../transport/anclapToml';
import SEP24 from '../../../transport/SEP24';
import { AnclapAssetCode } from '../../../transport/responses/IAnclapInfoResponse';
import SEP6 from '../../../transport/SEP6';
import { buildWithdrawTransaction, verifyAmount } from '../../../transport/helpers';
import { setNetwork } from '../../../../Stellar/transport';

export async function withdraw(this: IExecuteFunctions) {
	const stellarNetwork = await setNetwork.call(this);
	const token = this.getNodeParameter('token', 0) as string;
	const assetCode = this.getNodeParameter('assetCode', 0) as AnclapAssetCode;
	const publicKey = this.getNodeParameter('publicKey', 0) as string;
	const isInteractive = this.getNodeParameter('isInteractive', 0) as boolean;
	const anclapToml = await getAnclapToml.call(this);

	const getSep24WithdrawUrl = async () => {
		const sep24 = new SEP24(anclapToml, token);
		return await sep24.getWithdrawInteractiveUrl(assetCode, publicKey);
	};

	const getSep6WithdrawInfo = async () => {
		const amount = this.getNodeParameter('amount', 0) as string;
		const type = this.getNodeParameter('type', 0) as string;
		const dest = this.getNodeParameter('dest', 0) as string;
		const sep6 = new SEP6(anclapToml, token);
		const info = await sep6.getInfo();
		const withdrawAsset = info.withdraw[assetCode];

		if (verifyAmount(withdrawAsset, amount)) {
			const withdraw = await sep6.withdraw(assetCode, type, dest, publicKey, amount);
			const transaction = await buildWithdrawTransaction(
				publicKey,
				withdraw,
				stellarNetwork.url,
				stellarNetwork.passphrase,
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
