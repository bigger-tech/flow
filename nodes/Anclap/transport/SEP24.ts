import axios from 'axios';
import IAnclapTomlResponse from './IAnclapTomlResponse';

export default class SEP24 {
	private tomlInfo: IAnclapTomlResponse;
	private token: string;

	constructor(tomlInfo: IAnclapTomlResponse, token: string) {
		this.tomlInfo = tomlInfo;
		this.token = token;
	}

	async getDepositInteractiveUrl(assetCode: string, publicKey: string) {
		const result = await axios.post(
			`${this.tomlInfo.TRANSFER_SERVER_SEP0024}/transactions/deposit/interactive`,
			{
				asset_code: assetCode,
				account: publicKey,
			},
			{ headers: { Authorization: `Bearer ${this.token}` } },
		);

		return result.data;
	}

	async getWithdrawInteractiveUrl(assetCode: string, publicKey: string) {
		const result = await axios.post(
			`${this.tomlInfo.TRANSFER_SERVER_SEP0024}/transactions/withdraw/interactive`,
			{
				asset_code: assetCode,
				account: publicKey,
			},
			{ headers: { Authorization: `Bearer ${this.token}` } },
		);

		return result.data;
	}
}
