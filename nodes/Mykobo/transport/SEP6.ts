import axios from 'axios';
import AxiosHttpRequestError from './errors/AxiosHttpRequestError';
import { IMykoboTransferServerInfoResponse, IMykoboWithdrawResponse } from './responses/responses';
import TransactionsRequest from './requests/TransactionsRequest/TransactionsRequest';
import WithdrawRequest from './requests/WithdrawRequest/WithdrawRequest';
import MykoboCredentials from './MykoboCredentials';
import FeeRequest from './requests/FeeRequest/FeeRequest';
import queryBuilder from './utils/queryBuilder';
import IMykoboDepositResponse from './responses/IMykoboDepositResponse';
import IDepositRequest from './requests/DepositRequest/IDepositRequest';
import ITransferServerRequest from './requests/TransferServerRequest/ITransferServerRequest';
import TransactionRequest from './requests/TransactionRequest/TransactionRequest';

export default class SEP6 {
	private mykoboCredentials: MykoboCredentials;
	private token: string;

	constructor(mykoboCredentials: MykoboCredentials, token: string) {
		this.mykoboCredentials = mykoboCredentials;
		this.token = token;
	}

	async getInfo(request?: ITransferServerRequest): Promise<IMykoboTransferServerInfoResponse> {
		try {
			const toml = await this.mykoboCredentials.getToml();

			const url = request
				? `${toml.TRANSFER_SERVER}/info?${queryBuilder(request)}`
				: `${toml.TRANSFER_SERVER}/info`;
			const transferServerInfo = await axios.get(url);

			return transferServerInfo.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async deposit(request: IDepositRequest): Promise<IMykoboDepositResponse> {
		try {
			const toml = await this.mykoboCredentials.getToml();

			request.account = this.mykoboCredentials.publicKey;
			const queryParams = queryBuilder(request);

			const depositInformation = await axios.get(`${toml.TRANSFER_SERVER}/deposit?${queryParams}`, {
				headers: { Authorization: `Bearer ${this.token}` },
			});
			return depositInformation.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async withdraw(request: WithdrawRequest): Promise<IMykoboWithdrawResponse> {
		try {
			const toml = await this.mykoboCredentials.getToml();

			request.account = this.mykoboCredentials.publicKey;
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
			const toml = await this.mykoboCredentials.getToml();

			request.account = this.mykoboCredentials.publicKey;
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
			const toml = await this.mykoboCredentials.getToml();
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
			const toml = await this.mykoboCredentials.getToml();

			const queryParams = queryBuilder(request);

			const fee = await axios.get(`${toml.TRANSFER_SERVER}/fee?${queryParams}`, {
				headers: { Authorization: `Bearer ${this.token}` },
			});

			return fee.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}
}
