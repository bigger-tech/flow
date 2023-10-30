import axios from 'axios';
import AxiosHttpRequestError from './errors/AxiosHttpRequestError';
import MykoboCredentials from './MykoboCredentials';
import { validateXdrProvenance, signXdr } from './helpers';

export default class SEP10 {
	private mykoboCredentials: MykoboCredentials;

	constructor(mykoboCredentials: MykoboCredentials) {
		this.mykoboCredentials = mykoboCredentials;
	}

	async getChallenge() {
		const toml = await this.mykoboCredentials.getToml();

		try {
			const challenge = await axios.get(
				`${toml.WEB_AUTH_ENDPOINT}/?account=${this.mykoboCredentials.publicKey}`,
			);

			return challenge.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async validateChallenge(challengeXdr: string) {
		const toml = await this.mykoboCredentials.getToml();
		return await validateXdrProvenance(toml, challengeXdr, this.mykoboCredentials.publicKey);
	}

	async signChallenge(challengeXdr: string) {
		return signXdr(challengeXdr, this.mykoboCredentials);
	}

	async sendChallenge(signedXdr: string) {
		const toml = await this.mykoboCredentials.getToml();

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
