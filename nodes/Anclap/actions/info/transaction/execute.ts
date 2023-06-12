import { IExecuteFunctions } from 'n8n-workflow';
import SEP6 from '../../../transport/SEP6';
import SEP24 from '../../../transport/SEP24';
import AnclapCredentials from '../../../transport/AnclapCredentials';

export async function transaction(this: IExecuteFunctions) {
	const anclapCredentials = new AnclapCredentials(await this.getCredentials('anclapApi'));
	const token = this.getNodeParameter('token', 0) as string;
	const id = this.getNodeParameter('id', 0) as string;

	if (anclapCredentials.protocol === 'sep24') {
		return await getSep24Transaction();
	} else {
		return await getSep6Transaction();
	}

	async function getSep24Transaction() {
		const sep24 = new SEP24(anclapCredentials, token);
		return await sep24.getTransactionById(id);
	}

	async function getSep6Transaction() {
		const sep6 = new SEP6(anclapCredentials, token);
		return await sep6.getTransactionById(id);
	}
}
