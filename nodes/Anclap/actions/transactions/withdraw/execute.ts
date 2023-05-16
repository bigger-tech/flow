import { IExecuteFunctions } from 'n8n-workflow';
import { getAnclapToml } from '../../../transport/anclapToml';
import SEP24 from '../../../transport/SEP24';

export async function withdraw(this: IExecuteFunctions) {
	const token = this.getNodeParameter('token', 0) as string;
	const assetCode = this.getNodeParameter('assetCode', 0) as string;
	const publicKey = this.getNodeParameter('publicKey', 0) as string;
	const anclapToml = await getAnclapToml.call(this);
	const sep24 = new SEP24(anclapToml, token);
	const interactiveUrl = await sep24.getWithdrawInteractiveUrl(assetCode, publicKey);

	return { interactiveUrl };
}
