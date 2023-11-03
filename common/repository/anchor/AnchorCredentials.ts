import { ICredentialDataDecryptedObject } from 'n8n-workflow';
import SEP1 from './SEP1';
import GetAnchorTomlError from '../../errors/anchor/errors/GetAnchorTomlError';
import IAnchorTomlResponse from '../../responses/anchor/IAnchorTomlResponse';
import { StellarNetworkType } from '../../types/anchor/StellarNetworkType';
import { IAnchorCredentials } from '../../interfaces/anchor/IAnchorCredentials';

export default class AnchorCredentials implements IAnchorCredentials {
	public stellarNetwork: StellarNetworkType;
	public publicKey: string;
	public secretKey: string;
	public anchorName: string;

	constructor(credentials: ICredentialDataDecryptedObject) {
		this.stellarNetwork = credentials.stellarNetwork as StellarNetworkType;
		this.publicKey = credentials.publicKey as string;
		this.secretKey = credentials.secretKey as string;
		this.anchorName = credentials.anchorName as string;
	}

	async getToml(): Promise<IAnchorTomlResponse> {
		const sep1 = new SEP1(this.stellarNetwork, this.anchorName);
		const toml = await sep1.getInfo();

		if (toml) return toml;
		else {
			throw new GetAnchorTomlError('Anchor toml not found');
		}
	}
}
