import axios from 'axios';
import AxiosHttpRequestError from '../../errors/anchor/errors/AxiosHttpRequestError';
import AnchorCredentials from './AnchorCredentials';
import { validateXdrProvenance, signXdr } from './helpers';

export default class SEP10 {
	private anchorCredentials: AnchorCredentials;

	constructor(anchorCredentials: AnchorCredentials) {
		this.anchorCredentials = anchorCredentials;
	}

	async getChallenge() {
		const toml = await this.anchorCredentials.getToml();

		try {
			const challenge = await axios.get(
				`${toml.WEB_AUTH_ENDPOINT}/?account=${this.anchorCredentials.publicKey}`,
			);

			return challenge.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async validateChallenge(challengeXdr: string) {
		const toml = await this.anchorCredentials.getToml();
		return await validateXdrProvenance(toml, challengeXdr, this.anchorCredentials.publicKey);
	}

	async signChallenge(challengeXdr: string) {
		return signXdr(challengeXdr, this.anchorCredentials);
	}

	async sendChallenge(signedXdr: string) {
		const toml = await this.anchorCredentials.getToml();

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
