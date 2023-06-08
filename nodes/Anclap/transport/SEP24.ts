import axios from 'axios';
import IAnclapTomlResponse from './responses/IAnclapTomlResponse';
import AxiosHttpRequestError from './errors/AxiosHttpRequestError';
import TransactionsRequest from './requests/TransactionsRequest/TransactionsRequest';

export default class SEP24 {
	private tomlInfo: IAnclapTomlResponse;
	private token: string;

	constructor(tomlInfo: IAnclapTomlResponse, token: string) {
		this.tomlInfo = tomlInfo;
		this.token = token;
	}

	async getDepositInteractiveUrl(assetCode: string, publicKey: string) {
		try {
			const result = await axios.post(
				`${this.tomlInfo.TRANSFER_SERVER_SEP0024}/transactions/deposit/interactive`,
				{
					asset_code: assetCode,
					account: publicKey,
				},
				{ headers: { Authorization: `Bearer ${this.token}` } },
			);

			return result.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async getWithdrawInteractiveUrl(assetCode: string, publicKey: string) {
		try {
			const result = await axios.post(
				`${this.tomlInfo.TRANSFER_SERVER_SEP0024}/transactions/withdraw/interactive`,
				{
					asset_code: assetCode,
					account: publicKey,
				},
				{ headers: { Authorization: `Bearer ${this.token}` } },
			);

			return result.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async getTransactions(request: TransactionsRequest) {
		try {
			const result = await axios.get(`${this.tomlInfo.TRANSFER_SERVER_SEP0024}/transactions`, {
				headers: { Authorization: `Bearer ${this.token}` },
				params: { asset_code: request.code, account: request.account, kind: request.kind },
			});

			return result.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async getTransactionById(id: string) {
		try {
			const info = await axios.get(`${this.tomlInfo.TRANSFER_SERVER_SEP0024}/transaction`, {
				headers: { Authorization: `Bearer ${this.token}` },
				params: { id },
			});

			return info.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}
}
