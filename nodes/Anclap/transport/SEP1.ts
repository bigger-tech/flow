import axios from 'axios';
import toml from 'toml';
import IAnclapTomlResponse from './IAnclapTomlResponse';
import AxiosHttpRequestError from './errors/AxiosHttpRequestError';

export default class SEP1 {
	private anclapUrl = 'https://api-stage.anclap.ar/.well-known/stellar.toml';

	async getInfo(): Promise<IAnclapTomlResponse> {
		try {
			const result = await axios.get(this.anclapUrl);

			return toml.parse(result.data) as IAnclapTomlResponse;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}
}
