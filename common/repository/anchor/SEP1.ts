import axios from 'axios';
import toml from 'toml';
import IAnchorTomlResponse from '../../responses/anchor/IAnchorTomlResponse';
import AxiosHttpRequestError from '../../errors/anchor/errors/AxiosHttpRequestError';
import { StellarNetworkType } from '../../types/anchor/StellarNetworkType';

export default class SEP1 {
	private anchorUrl: string;

	constructor(network: StellarNetworkType, anchorName: string) {
		this.anchorUrl = this.getAnchorUrl(anchorName, network);
	}

	async getInfo(): Promise<IAnchorTomlResponse> {
		try {
			const { data } = await axios.get(this.anchorUrl);
			return toml.parse(data) as IAnchorTomlResponse;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	private getAnchorUrl(anchorName: string, network: StellarNetworkType): string {
		const anchorUrls: { [key: string]: { [key in StellarNetworkType]: string } } = {
			anclap: {
				public: 'https://api.anclap.com/.well-known/stellar.toml',
				testnet: 'https://api-stage.anclap.ar/.well-known/stellar.toml',
			},
			mykobo: {
				public: 'https://anchor.mykobo.co/.well-known/stellar.toml',
				testnet: 'https://dev.anchor.mykobo.co/.well-known/stellar.toml',
			},
		};
		return anchorUrls[anchorName][network];
	}
}
