import { IExecuteFunctions } from 'n8n-workflow';
import { getAnclapToml } from '../../../transport/anclapToml';
import SEP10 from '../../../transport/SEP10';

export async function get(this: IExecuteFunctions) {
	const publicKey = this.getNodeParameter('publicKey', 0) as string;
	const anclapToml = await getAnclapToml.call(this);
	const sep10 = new SEP10(anclapToml);
	const challenge = await sep10.getChallenge(publicKey);

	return { challenge };
}
