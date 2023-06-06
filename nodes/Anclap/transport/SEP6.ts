import axios from 'axios';
import AxiosHttpRequestError from './errors/AxiosHttpRequestError';
import {
	IAnclapTomlResponse,
	IAnclapInfoResponse,
	IAnclapWithdrawResponse,
} from './responses/responses';

export default class SEP6 {
	private tomlInfo: IAnclapTomlResponse;
	private token: string;

	constructor(tomlInfo: IAnclapTomlResponse, token: string) {
		this.tomlInfo = tomlInfo;
		this.token = token;
	}

	async getInfo(): Promise<IAnclapInfoResponse> {
		try {
			const info = await axios.get(`${this.tomlInfo.TRANSFER_SERVER}/info`);

			return info.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async deposit(code: string, account: string, amount: string) {
		try {
			const info = await axios.get(
				`${this.tomlInfo.TRANSFER_SERVER}/deposit?asset_code=${code}&account=${account}&amount=${amount}`,
				{ headers: { Authorization: `Bearer ${this.token}` } },
			);

			return info.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async withdraw(
		code: string,
		type: string,
		dest: string,
		account: string,
		amount: string,
	): Promise<IAnclapWithdrawResponse> {
		try {
			const info = await axios.get(
				`${this.tomlInfo.TRANSFER_SERVER}/withdraw?asset_code=${code}&type=${type}&dest=${dest}&account=${account}&amount=${amount}`,
				{ headers: { Authorization: `Bearer ${this.token}` } },
			);

			return info.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async getTransactions(code: string, account: string, kind: string) {
		try {
			const info = await axios.get(
				`${this.tomlInfo.TRANSFER_SERVER}/transactions?asset_code=${code}&account=${account}&kind=${
					kind !== 'default' ? kind : ''
				}`,
				{ headers: { Authorization: `Bearer ${this.token}` } },
			);

			return info.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}
}
