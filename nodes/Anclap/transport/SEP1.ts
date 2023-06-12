import axios from 'axios';
import toml from 'toml';
import IAnclapTomlResponse from './responses/IAnclapTomlResponse';
import AxiosHttpRequestError from './errors/AxiosHttpRequestError';
import { StellarNetwork } from './types';

export default class SEP1 {
	private anclapUrl: string;

	constructor(network: StellarNetwork) {
		if (network === 'public') {
			this.anclapUrl = 'https://api.anclap.com/.well-known/stellar.toml';
		} else {
			this.anclapUrl = 'https://api-stage.anclap.ar/.well-known/stellar.toml';
		}
	}

	async getInfo(): Promise<IAnclapTomlResponse> {
		try {
			const result = await axios.get(this.anclapUrl);
			return toml.parse(result.data) as IAnclapTomlResponse;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}
}
