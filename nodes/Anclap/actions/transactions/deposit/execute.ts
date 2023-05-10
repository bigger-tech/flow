import { IExecuteFunctions } from 'n8n-workflow';
import SEP1 from '../../../transport/SEP1';
import SEP24 from '../../../transport/SEP24';

export async function deposit(this: IExecuteFunctions) {
	const token = this.getNodeParameter('token', 0) as string;
	const assetCode = this.getNodeParameter('assetCode', 0) as string;
	const publicKey = this.getNodeParameter('publicKey', 0) as string;

	const sep1 = new SEP1();
	const sep24 = new SEP24(await sep1.getInfo(), token);
	const interactiveUrl = await sep24.getDepositInteractiveUrl(assetCode, publicKey);

	return { interactiveUrl };
}
