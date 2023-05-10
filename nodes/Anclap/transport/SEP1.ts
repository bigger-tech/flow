import axios from 'axios';
import toml from 'toml';
import IAnclapTomlResponse from './IAnclapTomlResponse';

export default class SEP1 {
	private anclapUrl = 'https://api-stage.anclap.ar/.well-known/stellar.toml';

	async getInfo(): Promise<IAnclapTomlResponse> {
		const result = await axios.get(this.anclapUrl);

		return toml.parse(result.data) as IAnclapTomlResponse;
	}
}
