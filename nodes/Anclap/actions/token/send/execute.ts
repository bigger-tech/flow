import { IExecuteFunctions } from 'n8n-workflow';
import { getAnclapToml } from '../../../transport/anclapToml';
import SEP10 from '../../../transport/SEP10';

export async function send(this: IExecuteFunctions) {
	const signedXdr = this.getNodeParameter('signedXdr', 0) as string;
	const anclapToml = await getAnclapToml.call(this);

	try {
		const sep10 = new SEP10(anclapToml);
		const token = await sep10.sendChallenge(signedXdr);
		return { token };
	} catch (e) {
		throw new Error(e);
	}
}
