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
			const depositUrl = await axios.post(
				`${toml.TRANSFER_SERVER_SEP0024}/transactions/deposit/interactive`,
				{
					asset_code: assetCode,
					account: this.anclapCredentials.publicKey,
				},
				{ headers: { Authorization: `Bearer ${this.token}` } },
			);

			return depositUrl.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async getWithdrawInteractiveUrl(assetCode: string) {
		const toml = await this.anclapCredentials.getToml();

		try {
			const withdrawUrl = await axios.post(
				`${toml.TRANSFER_SERVER_SEP0024}/transactions/withdraw/interactive`,
				{
					asset_code: assetCode,
					account: this.anclapCredentials.publicKey,
				},
				{ headers: { Authorization: `Bearer ${this.token}` } },
			);

			return withdrawUrl.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async getTransactions(request: TransactionsRequest) {
		const toml = await this.anclapCredentials.getToml();

		request.account = this.anclapCredentials.publicKey;
		const queryParams = queryBuilder(request);
		try {
			const transactions = await axios.get(`${toml.TRANSFER_SERVER_SEP0024}/transactions?${queryParams}`, {
				headers: { Authorization: `Bearer ${this.token}` },
			});

			return transactions.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async getTransactionById(request: TransactionRequest) {
		const toml = await this.anclapCredentials.getToml();

		const queryParams= queryBuilder(request);
		try {
			const transactionDetail = await axios.get(`${toml.TRANSFER_SERVER_SEP0024}/transaction?${queryParams}`, {
				headers: { Authorization: `Bearer ${this.token}` },
			});

			return transactionDetail.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}
}
