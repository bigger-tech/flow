import { IExecuteFunctions } from 'n8n-workflow';
import AnclapCredentials from '../../../transport/AnclapCredentials';
import SEP10 from '../../../transport/SEP10';

export async function get(this: IExecuteFunctions) {
	const anclapCredentials = new AnclapCredentials(
		await this.getCredentials('anclapCredentialsApi'),
	);
	const sep10 = new SEP10(anclapCredentials);
	const challenge = await sep10.getChallenge();

	return { challenge };
}
