import { IExecuteFunctions } from 'n8n-workflow';
import SEP10 from '../../../../../common/repository/anchor/SEP10';
import AnchorCredentials from '../../../../../common/repository/anchor/AnchorCredentials';

export async function get(this: IExecuteFunctions) {
	const mykoboCredentials = new AnchorCredentials(await this.getCredentials('mykoboApi'));
	const sep10 = new SEP10(mykoboCredentials);
	return await sep10.getChallenge();
}
