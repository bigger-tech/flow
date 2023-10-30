import { ICredentialDataDecryptedObject } from 'n8n-workflow';
import { StellarNetwork } from './types';
import SEP1 from './SEP1';
import GetMykoboTomlError from './errors/GetMykoboTomlError';
import { IMykoboTomlResponse } from './responses/responses';

export default class MykoboCredentials {
	public stellarNetwork: StellarNetwork;
	public publicKey: string;
	public secretKey: string;

	constructor(credentials: ICredentialDataDecryptedObject) {
		this.stellarNetwork = credentials.stellarNetwork as StellarNetwork;
		this.publicKey = credentials.publicKey as string;
		this.secretKey = credentials.secretKey as string;
	}

	async getToml(): Promise<IMykoboTomlResponse> {
		const sep1 = new SEP1(this.stellarNetwork);
		const toml = await sep1.getInfo();

		if (toml) return toml;
		else {
			throw new GetMykoboTomlError('Mykobo.toml not found');
		}
	}
}
