import axios from 'axios';
import toml from 'toml';
import IMykoboTomlResponse from './responses/IMykoboTomlResponse';
import AxiosHttpRequestError from './errors/AxiosHttpRequestError';
import { StellarNetwork } from './types';

export default class SEP1 {
	private mykoboUrl: string;

	constructor(network: StellarNetwork) {
		const tomlUrls: { [key in StellarNetwork]: string } = {
			public: 'https://anchor.mykobo.co/.well-known/stellar.toml',
			testnet: 'https://dev.anchor.mykobo.co/.well-known/stellar.toml',
		};

		this.mykoboUrl = tomlUrls[network];
	}

	async getInfo(): Promise<IMykoboTomlResponse> {
		try {
			const result = await axios.get(this.mykoboUrl);
			return toml.parse(result.data) as IMykoboTomlResponse;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}
}
