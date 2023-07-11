import axios from 'axios';
import AxiosHttpRequestError from './errors/AxiosHttpRequestError';
import { IAnclapInfoResponse, IAnclapWithdrawResponse } from './responses/responses';
import TransactionsRequest from './requests/TransactionsRequest/TransactionsRequest';
import WithdrawRequest from './requests/WithdrawRequest/WithdrawRequest';
import AnclapCredentials from './AnclapCredentials';
import FeeRequest from './requests/FeeRequest/FeeRequest';
import queryBuilder from './utils/queryBuilder';
import IAnclapDepositResponse from './responses/IAnclapDepositResponse';
import IDepositRequest from './requests/DepositRequest/IDepositRequest';
import IWithdrawExchangeRequest from './requests/WithdrawRequest/IWithdrawExchangeRequest';
import IDepositExchangeRequest from './requests/DepositRequest/IDepositExchangeRequest';

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

	async deposit(request: IDepositRequest): Promise<IAnclapDepositResponse> {
		try {
			const toml = await this.anclapCredentials.getToml();

			request.account = this.anclapCredentials.publicKey;
			const queryParams = queryBuilder(request);
			
			const depositInformation = await axios.get(
				`${toml.TRANSFER_SERVER}/deposit?${queryParams}`,
				{ headers: { Authorization: `Bearer ${this.token}` } },
			);
			return depositInformation.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async withdraw(request: WithdrawRequest): Promise<IAnclapWithdrawResponse> {
		try {
			const toml = await this.anclapCredentials.getToml();

			request.account = this.anclapCredentials.publicKey;
			const queryParams = queryBuilder(request);

			const info = await axios.get(
				`${toml.TRANSFER_SERVER}/withdraw?${queryParams}`,
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

			const queryParams = queryBuilder(request);

			const info = await axios.get(
				`${toml.TRANSFER_SERVER}/transactions?account=${this.anclapCredentials.publicKey}&${queryParams}`,
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

	async getFee(request: FeeRequest) {
		try {
			const toml = await this.anclapCredentials.getToml();

			const queryParams = queryBuilder(request);

			const info = await axios.get(`${toml.TRANSFER_SERVER}/fee?${queryParams}`, {
				headers: { Authorization: `Bearer ${this.token}` },
			});

			return info.data;
		}catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async getDepositExchange(request: IDepositExchangeRequest): Promise<IAnclapDepositResponse>{
		try {
			const toml = await this.anclapCredentials.getToml();

			request.account = this.anclapCredentials.publicKey;
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

	async getWithdrawExchange(request: IWithdrawExchangeRequest): Promise<IAnclapWithdrawResponse>{
		try {
			const toml = await this.anclapCredentials.getToml();

			request.account = this.anclapCredentials.publicKey;
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
