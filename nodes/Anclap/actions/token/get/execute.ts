import { IExecuteFunctions } from 'n8n-workflow';
import SEP1 from '../../../transport/SEP1';
import SEP10 from '../../../transport/SEP10';

export async function get(this: IExecuteFunctions) {
	const publicKey = this.getNodeParameter('publicKey', 0) as string;

	const sep1 = new SEP1();
	const sep10 = new SEP10(await sep1.getInfo());
	const challenge = await sep10.getChallenge(publicKey);

	return { challenge };
}
