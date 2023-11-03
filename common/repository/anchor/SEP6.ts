import axios from 'axios';
import AxiosHttpRequestError from '../../errors/anchor/errors/AxiosHttpRequestError';
import TransactionsRequest from '../../requests/anchor/TransactionsRequest/TransactionsRequest';
import WithdrawRequest from '../../requests/anchor/WithdrawRequest/WithdrawRequest';
import AnchorCredentials from './AnchorCredentials';
import queryBuilder from '../../utils/anchor/queryBuilder';
import IAnchorDepositResponse from '../../responses/anchor/IAnchorDepositResponse';
import IDepositRequest from '../../requests/anchor/DepositRequest/IDepositRequest';
import IWithdrawExchangeRequest from '../../requests/anchor/WithdrawRequest/IWithdrawExchangeRequest';
import IDepositExchangeRequest from '../../requests/anchor/DepositRequest/IDepositExchangeRequest';
import ITransferServerRequest from '../../requests/anchor/TransferServerRequest/ITransferServerRequest';
import TransactionRequest from '../../requests/anchor/TransactionRequest/TransactionRequest';
import IAnchorTransferServerInfoResponse from '../../responses/anchor/IAnchorTransferServerInfoResponse';
import IAnchorWithdrawResponse from '../../responses/anchor/IAnchorWithdrawResponse';
import FeeRequest from '../../requests/anchor/FeeRequest/FeeRequest';

export default class SEP6 {
	private anchorCredentials: AnchorCredentials;
	private token: string;

	constructor(anchorCredentials: AnchorCredentials, token: string) {
		this.anchorCredentials = anchorCredentials;
		this.token = token;
	}

	async getInfo(request?: ITransferServerRequest): Promise<IAnchorTransferServerInfoResponse> {
		try {
			const toml = await this.anchorCredentials.getToml();

			const url = request
				? `${toml.TRANSFER_SERVER}/info?${queryBuilder(request)}`
				: `${toml.TRANSFER_SERVER}/info`;
			const transferServerInfo = await axios.get(url);

			return transferServerInfo.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async deposit(request: IDepositRequest): Promise<IAnchorDepositResponse> {
		try {
			const toml = await this.anchorCredentials.getToml();

			request.account = this.anchorCredentials.publicKey;
			const queryParams = queryBuilder(request);

			const depositInformation = await axios.get(`${toml.TRANSFER_SERVER}/deposit?${queryParams}`, {
				headers: { Authorization: `Bearer ${this.token}` },
			});
			return depositInformation.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async withdraw(request: WithdrawRequest): Promise<IAnchorWithdrawResponse> {
		try {
			const toml = await this.anchorCredentials.getToml();

			request.account = this.anchorCredentials.publicKey;
			const queryParams = queryBuilder(request);

			const withdrawInformation = await axios.get(
				`${toml.TRANSFER_SERVER}/withdraw?${queryParams}`,
				{ headers: { Authorization: `Bearer ${this.token}` } },
			);

			return withdrawInformation.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async getTransactions(request: TransactionsRequest) {
		try {
			const toml = await this.anchorCredentials.getToml();

			request.account = this.anchorCredentials.publicKey;
			const queryParams = queryBuilder(request);

			const transactions = await axios.get(`${toml.TRANSFER_SERVER}/transactions?${queryParams}`, {
				headers: { Authorization: `Bearer ${this.token}` },
			});

			return transactions.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async getTransactionById(request: TransactionRequest) {
		try {
			const toml = await this.anchorCredentials.getToml();
			const queryParams = queryBuilder(request);

			const transactionDetail = await axios.get(
				`${toml.TRANSFER_SERVER}/transaction?${queryParams}`,
				{
					headers: { Authorization: `Bearer ${this.token}` },
				},
			);

			return transactionDetail.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async getFee(request: FeeRequest) {
		try {
			const toml = await this.anchorCredentials.getToml();

			const queryParams = queryBuilder(request);

			const fee = await axios.get(`${toml.TRANSFER_SERVER}/fee?${queryParams}`, {
				headers: { Authorization: `Bearer ${this.token}` },
			});

			return fee.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async getDepositExchange(request: IDepositExchangeRequest): Promise<IAnchorDepositResponse> {
		try {
			const toml = await this.anchorCredentials.getToml();

			request.account = this.anchorCredentials.publicKey;
			const queryParams = queryBuilder(request);

			const depositInformation = await axios.get(
				`${toml.TRANSFER_SERVER}/deposit-exchange?${queryParams}`,
				{ headers: { Authorization: `Bearer ${this.token}` } },
			);

			return depositInformation.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async getWithdrawExchange(request: IWithdrawExchangeRequest): Promise<IAnchorWithdrawResponse> {
		try {
			const toml = await this.anchorCredentials.getToml();

			request.account = this.anchorCredentials.publicKey;
			const queryParams = queryBuilder(request);

			const withdrawInformation = await axios.get(
				`${toml.TRANSFER_SERVER}/withdraw-exchange?${queryParams}`,
				{ headers: { Authorization: `Bearer ${this.token}` } },
			);

			return withdrawInformation.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}
}
