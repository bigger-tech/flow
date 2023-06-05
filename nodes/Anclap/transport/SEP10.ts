import axios from 'axios';
import IAnclapTomlResponse from './responses/IAnclapTomlResponse';
import AxiosHttpRequestError from './errors/AxiosHttpRequestError';

export default class SEP10 {
	private tomlInfo: IAnclapTomlResponse;

	constructor(tomlInfo: IAnclapTomlResponse) {
		this.tomlInfo = tomlInfo;
	}

	async getChallenge(publicKey: string) {
		try {
			const challenge = await axios.get(`${this.tomlInfo.WEB_AUTH_ENDPOINT}/?account=${publicKey}`);

			return challenge.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async sendChallenge(signedXdr: string) {
		try {
			const token = await axios.post(`${this.tomlInfo.WEB_AUTH_ENDPOINT}/`, {
				transaction: signedXdr,
			});

			return token.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}
}
