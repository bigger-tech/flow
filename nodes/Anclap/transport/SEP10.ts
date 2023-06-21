import axios from 'axios';
import AxiosHttpRequestError from './errors/AxiosHttpRequestError';
import AnclapCredentials from './AnclapCredentials';

export default class SEP10 {
	private anclapCredentials: AnclapCredentials;

	constructor(anclapCredentials: AnclapCredentials) {
		this.anclapCredentials = anclapCredentials;
	}

	async getChallenge() {
		const toml = await this.anclapCredentials.getToml();

		try {
			const challenge = await axios.get(
				`${toml.WEB_AUTH_ENDPOINT}/?account=${this.anclapCredentials.publicKey}`,
			);

			return challenge.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async sendChallenge(signedXdr: string) {
		const toml = await this.anclapCredentials.getToml();

		try {
			const token = await axios.post(`${toml.WEB_AUTH_ENDPOINT}/`, {
				transaction: signedXdr,
			});

			return token.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}
}
