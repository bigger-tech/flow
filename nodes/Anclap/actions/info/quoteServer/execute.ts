import AnchorCredentials from '../../../../../common/repository/anchor/AnchorCredentials';
import { IExecuteFunctions } from 'n8n-workflow';
import SEP38 from '../../../../../common/repository/anchor/SEP38';

export async function getQuoteServer(this: IExecuteFunctions) {
	const anclapCredentials = new AnchorCredentials(await this.getCredentials('anclapApi'));

	const sep38 = new SEP38(anclapCredentials, '');

	return await sep38.getInfo();
}
