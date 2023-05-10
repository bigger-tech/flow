import { IExecuteFunctions } from 'n8n-workflow';
import SEP1 from '../../../transport/SEP1';
import SEP10 from '../../../transport/SEP10';

export async function send(this: IExecuteFunctions) {
	const signedXdr = this.getNodeParameter('signedXdr', 0) as string;

	try {
		const sep1 = new SEP1();
		const sep10 = new SEP10(await sep1.getInfo());
		const token = await sep10.sendChallenge(signedXdr);

		return { token };
	} catch (e) {
		throw new Error(e);
	}
}
