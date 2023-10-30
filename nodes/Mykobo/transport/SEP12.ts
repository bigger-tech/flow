import axios from 'axios';
import MykoboCredentials from './MykoboCredentials';
import { ICallbackRequest } from './requests/KYCRequest/ICallbackRequest';
import { IKYCDeleteRequest } from './requests/KYCRequest/IKYCDeleteRequest';
import { IKYCRequest } from './requests/KYCRequest/IKYCRequest';
import queryBuilder from './utils/queryBuilder';
import AxiosHttpRequestError from './errors/AxiosHttpRequestError';
import PayloadBuilder from './utils/PayloadBuilder';
import convertToSnakeCase from './utils/convertToSnakeCase';

export default class SEP12 {
	private mykoboCredentials: MykoboCredentials;
	private token: string;

	constructor(mykoboCredentials: MykoboCredentials, token: string) {
		this.mykoboCredentials = mykoboCredentials;
		this.token = token;
	}

	async getKYCStatus(request?: IKYCRequest) {
		const toml = await this.mykoboCredentials.getToml();

		const url = request
			? `${toml.KYC_SERVER}/customer?${queryBuilder(request)}`
			: `${toml.KYC_SERVER}/customer`;

		try {
			const kycStatus = await axios.get(url, {
				headers: { Authorization: `Bearer ${this.token}` },
			});

			return kycStatus.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}
	async setCallbackUrl(request: ICallbackRequest) {
		const toml = await this.mykoboCredentials.getToml();
		request.account = this.mykoboCredentials.publicKey;

		const payload = new PayloadBuilder(request)
			.parseObjectKeyCaseType(convertToSnakeCase)
			.filterUndefinedValues()
			.build();

		try {
			const response = await axios.put(`${toml.KYC_SERVER}/customer/callback`, payload, {
				headers: { Authorization: `Bearer ${this.token}` },
			});

			return response.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async deleteKYCInformation(request?: IKYCDeleteRequest) {
		const toml = await this.mykoboCredentials.getToml();

		if (!request) {
			request = {};
		}
		request.account = this.mykoboCredentials.publicKey;
		const queryParams = queryBuilder(request);

		try {
			const deleteStatus = await axios.delete(`${toml.KYC_SERVER}/customer/${queryParams}`, {
				headers: { Authorization: `Bearer ${this.token}` },
			});

			return deleteStatus.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}
}
