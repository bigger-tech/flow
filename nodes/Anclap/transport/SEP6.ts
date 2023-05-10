import axios from 'axios';
import IAnclapTomlResponse from './IAnclapTomlResponse';

export default class SEP6 {
	private tomlInfo: IAnclapTomlResponse;

	constructor(tomlInfo: IAnclapTomlResponse) {
		this.tomlInfo = tomlInfo;
	}

	async getInfo() {
		const info = await axios.get(`${this.tomlInfo.TRANSFER_SERVER}/info`);

		return info.data;
	}
}
