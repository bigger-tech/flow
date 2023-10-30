import { IExecuteFunctions } from 'n8n-workflow';

import MykoboCredentials from '../../../transport/MykoboCredentials';
import SEP10 from '../../../transport/SEP10';

export async function sign(this: IExecuteFunctions) {
	const challengeXdr = this.getNodeParameter('challengeXdr', 0) as string;

	const mykoboCredentials = new MykoboCredentials(await this.getCredentials('mykoboApi'));
	const sep10 = new SEP10(mykoboCredentials);

	return await sep10.signChallenge(challengeXdr);
}
