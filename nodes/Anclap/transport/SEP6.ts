import axios from 'axios';
import IAnclapTomlResponse from './IAnclapTomlResponse';
import AxiosHttpRequestError from './errors/AxiosHttpRequestError';

export default class SEP6 {
	private tomlInfo: IAnclapTomlResponse;
	private token: string;

	constructor(tomlInfo: IAnclapTomlResponse, token: string) {
		this.tomlInfo = tomlInfo;
		this.token = token;
	}

	async getInfo() {
		try {
			const info = await axios.get(`${this.tomlInfo.TRANSFER_SERVER}/info`);

			return info.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async getTransactions(code: string, account: string) {
		try {
			const info = await axios.get(
				`${this.tomlInfo.TRANSFER_SERVER}/transactions?asset_code=${code}&account=${account}`,
				{ headers: { Authorization: `Bearer ${this.token}` } },
			);

			return info.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}
}
