import { IExecuteFunctions } from 'n8n-workflow';
import { getAnclapToml } from '../../../transport/anclapToml';
import SEP24 from '../../../transport/SEP24';
import SEP6 from '../../../transport/SEP6';
import { AnclapAssetCode } from '../../../transport/responses/IAnclapInfoResponse';
import { verifyAmount } from '../../../transport/helpers';

export async function deposit(this: IExecuteFunctions) {
	const token = this.getNodeParameter('token', 0) as string;
	const assetCode = this.getNodeParameter('assetCode', 0) as AnclapAssetCode;
	const publicKey = this.getNodeParameter('publicKey', 0) as string;
	const isInteractive = this.getNodeParameter('isInteractive', 0) as boolean;
	const anclapToml = await getAnclapToml.call(this);

	const getSep24DepositUrl = async () => {
		const sep24 = new SEP24(anclapToml, token);
		const interactiveUrl = await sep24.getDepositInteractiveUrl(assetCode, publicKey);
		return { interactiveUrl };
	};

	const getSep6DepositInfo = async () => {
		const amount = this.getNodeParameter('amount', 0) as string;
		const sep6 = new SEP6(anclapToml, token);
		const info = await sep6.getInfo();
		const depositAsset = info.deposit[assetCode];

		if (verifyAmount(depositAsset, amount)) {
			return await sep6.deposit(assetCode, publicKey, amount);
		} else {
			return { error: 'The amount is less than the min amount', depositAsset };
		}
	};

	if (isInteractive) {
		return await getSep24DepositUrl();
	} else {
		return await getSep6DepositInfo();
	}
}
