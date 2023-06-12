import { IExecuteFunctions } from 'n8n-workflow';
import SEP24 from '../../../transport/SEP24';
import SEP6 from '../../../transport/SEP6';
import { AnclapAssetCode } from '../../../transport/responses/IAnclapInfoResponse';
import { verifyAmount } from '../../../transport/helpers';
import AnclapCredentials from '../../../transport/AnclapCredentials';

export async function deposit(this: IExecuteFunctions) {
	const token = this.getNodeParameter('token', 0) as string;
	const assetCode = this.getNodeParameter('assetCode', 0) as AnclapAssetCode;
	const anclapCredentials = new AnclapCredentials(await this.getCredentials('anclapCredentials'));

	const getSep24DepositUrl = async () => {
		const sep24 = new SEP24(anclapCredentials, token);
		const interactiveUrl = await sep24.getDepositInteractiveUrl(assetCode);
		return { interactiveUrl };
	};

	const getSep6DepositInfo = async () => {
		const amount = this.getNodeParameter('amount', 0) as string;
		const sep6 = new SEP6(anclapCredentials, token);
		const info = await sep6.getInfo();
		const depositAsset = info.deposit[assetCode];

		if (verifyAmount(depositAsset, amount)) {
			return await sep6.deposit(assetCode, amount);
		} else {
			return { error: 'The amount is less than the min amount', depositAsset };
		}
	};

	if (anclapCredentials.protocol === 'sep24') {
		return await getSep24DepositUrl();
	} else {
		return await getSep6DepositInfo();
	}
}
