import { IExecuteFunctions } from 'n8n-workflow';
import { getAnclapToml } from '../../../transport/anclapToml';
import SEP6 from '../../../transport/SEP6';
import { Protocol } from '../../../transport/transactionInfoTypes';
import SEP24 from '../../../transport/SEP24';

export async function transaction(this: IExecuteFunctions) {
	const token = this.getNodeParameter('token', 0) as string;
	const protocol = this.getNodeParameter('protocol', 0) as Protocol;
	const id = this.getNodeParameter('id', 0) as string;
	const anclapToml = await getAnclapToml.call(this);

	if (protocol === 'sep24') {
		return await getSep24Transaction();
	} else {
		return await getSep6Transaction();
	}

	async function getSep24Transaction() {
		const sep24 = new SEP24(anclapToml, token);
		return await sep24.getTransactionById(id);
	}

	async function getSep6Transaction() {
		const sep6 = new SEP6(anclapToml, token);
		return await sep6.getTransactionById(id);
	}
}
