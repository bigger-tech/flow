import axios from 'axios';
import IAnclapTomlResponse from './IAnclapTomlResponse';
import AxiosHttpRequestError from './errors/AxiosHttpRequestError';

export default class SEP6 {
	private tomlInfo: IAnclapTomlResponse;

	constructor(tomlInfo: IAnclapTomlResponse) {
		this.tomlInfo = tomlInfo;
	}

	async getInfo() {
		try {
			const info = await axios.get(`${this.tomlInfo.TRANSFER_SERVER}/info`);

			return info.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}
}
