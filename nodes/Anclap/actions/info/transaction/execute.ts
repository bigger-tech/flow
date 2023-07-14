import { IExecuteFunctions } from 'n8n-workflow';
import SEP6 from '../../../transport/SEP6';
import SEP24 from '../../../transport/SEP24';
import AnclapCredentials from '../../../transport/AnclapCredentials';
import { Protocol } from '../../../transport/types';
import TransactionRequest from '../../../transport/requests/TransactionRequest/TransactionRequest';
import ITransactionRequest from '../../../transport/requests/TransactionRequest/ITransactionRequest';

export async function transaction(this: IExecuteFunctions) {
	const anclapCredentials = new AnclapCredentials(await this.getCredentials('anclapApi'));
	const protocol = this.getNodeParameter('protocol', 0) as Protocol;
	const token = this.getNodeParameter('token', 0) as string;

	const id = this.getNodeParameter('id', 0) as string;

	const showOptionalValues = this.getNodeParameter('showOptionalValues', 0) as boolean;

	let transactionRequest: ITransactionRequest;

	if (showOptionalValues) {
		const stellarTransactionId = this.getNodeParameter('stellarTransactionId', 0) as string;
		const externalTransactionId = this.getNodeParameter('externalTransactionId', 0) as string;
		const lang = this.getNodeParameter('lang', 0) as string;

		if (!id && !stellarTransactionId && !externalTransactionId) {
			throw new Error('One of these properties: Transaction ID, Stellar Transaction ID or External transaction ID is required in order to execute this node');
		}

		transactionRequest = new TransactionRequest({
			id,
			stellarTransactionId,
			externalTransactionId,
			lang,
		});
	} else {
		if (!id) {
			throw new Error('Transaction Id is required');
		}
		transactionRequest = new TransactionRequest({ id });
	}

	async function getSep24Transaction() {
		const sep24 = new SEP24(anclapCredentials, token);
		return await sep24.getTransactionById(transactionRequest);
	}

	async function getSep6Transaction() {
		const sep6 = new SEP6(anclapCredentials, token);
		return await sep6.getTransactionById(transactionRequest);
	}

	if (protocol === 'sep24') {
		return await getSep24Transaction();
	} else {
		return await getSep6Transaction();
	}
}
