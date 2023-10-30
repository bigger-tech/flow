import { IExecuteFunctions } from 'n8n-workflow';
import MykoboCredentials from '../../../transport/MykoboCredentials';
import SEP10 from '../../../transport/SEP10';

export async function get(this: IExecuteFunctions) {
	const mykoboCredentials = new MykoboCredentials(await this.getCredentials('mykoboApi'));
	const sep10 = new SEP10(mykoboCredentials);
	return await sep10.getChallenge();
}
