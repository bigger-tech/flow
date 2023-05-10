import axios from 'axios';
import IAnclapTomlResponse from './IAnclapTomlResponse';

export default class SEP10 {
	private tomlInfo: IAnclapTomlResponse;

	constructor(tomlInfo: IAnclapTomlResponse) {
		this.tomlInfo = tomlInfo;
	}

	async getChallenge(publicKey: string) {
		const challenge = await axios.get(`${this.tomlInfo.WEB_AUTH_ENDPOINT}/?account=${publicKey}`);

		return challenge.data;
	}

	async sendChallenge(signedXdr: string) {
		try {
			const token = await axios.post(`${this.tomlInfo.WEB_AUTH_ENDPOINT}/`, {
				transaction: signedXdr,
			});

			return token.data;
		} catch (e) {
			const data = e.response.data;

			if (data) {
				throw new Error(data.error);
			}

			throw new Error(e);
		}
	}
}
