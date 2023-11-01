import { IExecuteFunctions } from 'n8n-core';
import MykoboCredentials from '../../../transport/MykoboCredentials';
import SEP31 from '../../../transport/SEP31';

export async function getSupportedCurrencies(this: IExecuteFunctions) {
	const mykoboCredentials = new MykoboCredentials(await this.getCredentials('mykoboApi'));
	const lang = this.getNodeParameter('lang', 0) as string;

	const sep31 = new SEP31(mykoboCredentials, '');

	return lang ? await sep31.getInfo({ lang }) : await sep31.getInfo();
}
