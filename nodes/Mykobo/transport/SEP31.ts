import axios from 'axios';
import AxiosHttpRequestError from './errors/AxiosHttpRequestError';
import MykoboCredentials from './MykoboCredentials';
import queryBuilder from './utils/queryBuilder';
import IGetCurrenciesRequest from './requests/DirectPaymentRequest/IGetCurrenciesRequest';
import ITransferRequest from './requests/DirectPaymentRequest/IPaymentRequest';
import ICallbackRequest from './requests/DirectPaymentRequest/ICallbackRequest';
import IGetTransactionRequest from './requests/DirectPaymentRequest/IGetTransactionRequest';
import ITransactionResponse from './responses/ITransactionResponse';

import convertToSnakeCase from './utils/convertToSnakeCase';
import PayloadBuilder from './utils/PayloadBuilder';

export default class SEP31 {
	private mykoboCredentials: MykoboCredentials;
	private token: string;

	constructor(mykoboCredentials: MykoboCredentials, token: string) {
		this.mykoboCredentials = mykoboCredentials;
		this.token = token;
	}

	async getInfo(request?: IGetCurrenciesRequest) {
		try {
			const toml = await this.mykoboCredentials.getToml();

			const url = request
				? `${toml.DIRECT_PAYMENT_SERVER}/info?${queryBuilder(request)}`
				: `${toml.DIRECT_PAYMENT_SERVER}/info`;
			const response = await axios.get(url);

			return response.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async postInitialPayment(request: ITransferRequest) {
		const toml = await this.mykoboCredentials.getToml();

		const payload = new PayloadBuilder(request).parseObjectKeyCaseType(convertToSnakeCase).build();

		try {
			const response = await axios.post(`${toml.DIRECT_PAYMENT_SERVER}/transactions`, payload, {
				headers: { Authorization: `Bearer ${this.token}` },
			});

			return response.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async getTransactionById(request: IGetTransactionRequest) {
		const toml = await this.mykoboCredentials.getToml();
		const id = request.id;

		try {
			const response = await axios.get(`${toml.DIRECT_PAYMENT_SERVER}/transactions/${id}`, {
				headers: { Authorization: `Bearer ${this.token}` },
			});
			const transaction = response.data as ITransactionResponse;
			return transaction;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async setCallbackUrl(request: ICallbackRequest) {
		const toml = await this.mykoboCredentials.getToml();
		const id = request.id;
		const url = request.url;

		const payload = new PayloadBuilder({ url })
			.parseObjectKeyCaseType(convertToSnakeCase)
			.filterUndefinedValues()
			.build();

		try {
			const response = await axios.put(
				`${toml.DIRECT_PAYMENT_SERVER}/transactions/${id}/callback`,
				payload,
				{
					headers: { Authorization: `Bearer ${this.token}` },
				},
			);

			return response.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}
}
