import IAnchorTomlResponse from '../../responses/anchor/IAnchorTomlResponse';
import { StellarNetworkType } from '../../types/anchor/StellarNetworkType';

export interface IAnchorCredentials {
	stellarNetwork: StellarNetworkType;
	publicKey: string;
	secretKey: string;
	getToml(): Promise<IAnchorTomlResponse>;
}
