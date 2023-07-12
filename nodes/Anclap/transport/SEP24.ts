import axios from 'axios';
import AxiosHttpRequestError from './errors/AxiosHttpRequestError';
import TransactionsRequest from './requests/TransactionsRequest/TransactionsRequest';
import AnclapCredentials from './AnclapCredentials';
import queryBuilder from './utils/queryBuilder';
import TransactionRequest from './requests/TransactionRequest/TransactionRequest';

export default class SEP24 {
	private anclapCredentials: AnclapCredentials;
	private token: string;

	constructor(anclapCredentials: AnclapCredentials, token: string) {
		this.anclapCredentials = anclapCredentials;
		this.token = token;
	}

	async getDepositInteractiveUrl(assetCode: string) {
		const toml = await this.anclapCredentials.getToml();

		try {
			const result = await axios.post(
				`${toml.TRANSFER_SERVER_SEP0024}/transactions/deposit/interactive`,
				{
					asset_code: assetCode,
					account: this.anclapCredentials.publicKey,
				},
				{ headers: { Authorization: `Bearer ${this.token}` } },
			);

			return result.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async getWithdrawInteractiveUrl(assetCode: string) {
		const toml = await this.anclapCredentials.getToml();

		try {
			const result = await axios.post(
				`${toml.TRANSFER_SERVER_SEP0024}/transactions/withdraw/interactive`,
				{
					asset_code: assetCode,
					account: this.anclapCredentials.publicKey,
				},
				{ headers: { Authorization: `Bearer ${this.token}` } },
			);

			return result.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async getTransactions(request: TransactionsRequest) {
		const toml = await this.anclapCredentials.getToml();

		request.account = this.anclapCredentials.publicKey;
		const queryParams = queryBuilder(request);
		try {
			const result = await axios.get(`${toml.TRANSFER_SERVER_SEP0024}/transactions?${queryParams}`, {
				headers: { Authorization: `Bearer ${this.token}` },
			});

			return result.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async getTransactionById(request: TransactionRequest) {
		const toml = await this.anclapCredentials.getToml();

		const queryParams= queryBuilder(request);
		try {
			const info = await axios.get(`${toml.TRANSFER_SERVER_SEP0024}/transaction?${queryParams}`, {
				headers: { Authorization: `Bearer ${this.token}` },
			});

			return info.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}
}
