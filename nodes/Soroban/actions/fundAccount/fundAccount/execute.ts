import { StrKey } from '@stellar/stellar-sdk';
import type { IExecuteFunctions, IHttpRequestOptions } from 'n8n-workflow';
import InvalidPublicKeyError from '../../../../../common/errors/stellar/InvalidPublicKeyError';

const FRIENDBOT_URL = 'https://friendbot-futurenet.stellar.org/?addr=';

export async function fundAccount(this: IExecuteFunctions) {
	try {
		const [item] = this.getInputData();
		const {
			json: { publicKey },
		} = item;

		if (StrKey.isValidEd25519PublicKey(publicKey as string)) {
			const fundAccountRequest: IHttpRequestOptions = {
				url: `${FRIENDBOT_URL}${publicKey}`,
				method: 'GET',
			};
			await this.helpers.httpRequest(fundAccountRequest);
		} else {
			throw new InvalidPublicKeyError('Invalid public key');
		}
		return { accountFunded: publicKey };
	} catch (error) {
		throw new Error(error);
	}
}
