import { ICredentialDataDecryptedObject } from 'n8n-workflow';
import { StellarNetwork } from './types';
import SEP1 from './SEP1';
import GetAnclapTomlError from './errors/GetAnclapTomlError';

export default class AnclapCredentials {
	public stellarNetwork: StellarNetwork;
	public publicKey: string;

	constructor(credentials: ICredentialDataDecryptedObject) {
		this.stellarNetwork = credentials.stellarNetwork as StellarNetwork;
		this.publicKey = credentials.publicKey as string;
	}

	async getToml() {
		const sep1 = new SEP1(this.stellarNetwork);
		const toml = await sep1.getInfo();

		if (toml) {
			return toml;
		} else {
			throw new GetAnclapTomlError();
		}
	}
}
