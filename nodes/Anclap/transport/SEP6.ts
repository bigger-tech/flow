import axios from 'axios';
import AxiosHttpRequestError from './errors/AxiosHttpRequestError';
import { IAnclapInfoResponse, IAnclapWithdrawResponse } from './responses/responses';
import TransactionsRequest from './requests/TransactionsRequest/TransactionsRequest';
import WithdrawRequest from './requests/WithdrawRequest/WithdrawRequest';
import AnclapCredentials from './AnclapCredentials';

export default class SEP6 {
	private anclapCredentials: AnclapCredentials;
	private token: string;

	constructor(anclapCredentials: AnclapCredentials, token: string) {
		this.anclapCredentials = anclapCredentials;
		this.token = token;
	}

	async getInfo(): Promise<IAnclapInfoResponse> {
		try {
			const toml = await this.anclapCredentials.getToml();
			const info = await axios.get(`${toml.TRANSFER_SERVER}/info`);

			return info.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async deposit(code: string, amount: string) {
		try {
			const toml = await this.anclapCredentials.getToml();
			const info = await axios.get(
				`${toml.TRANSFER_SERVER}/deposit?asset_code=${code}&account=${this.anclapCredentials.publicKey}&amount=${amount}`,
				{ headers: { Authorization: `Bearer ${this.token}` } },
			);

			return info.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async withdraw(request: WithdrawRequest): Promise<IAnclapWithdrawResponse> {
		try {
			const toml = await this.anclapCredentials.getToml();
			const info = await axios.get(
				`${toml.TRANSFER_SERVER}/withdraw?asset_code=${request.code}&type=${request.type}&dest=${request.dest}&account=${this.anclapCredentials.publicKey}&amount=${request.amount}`,
				{ headers: { Authorization: `Bearer ${this.token}` } },
			);

			return info.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async getTransactions(request: TransactionsRequest) {
		try {
			const toml = await this.anclapCredentials.getToml();
			const info = await axios.get(
				`${toml.TRANSFER_SERVER}/transactions?asset_code=${request.code}&account=${this.anclapCredentials.publicKey}&kind=${request.kind}`,
				{ headers: { Authorization: `Bearer ${this.token}` } },
			);

			return info.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async getTransactionById(id: string) {
		try {
			const toml = await this.anclapCredentials.getToml();
			const info = await axios.get(`${toml.TRANSFER_SERVER}/transaction?id=${id}`, {
				headers: { Authorization: `Bearer ${this.token}` },
			});

			return info.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}
}
