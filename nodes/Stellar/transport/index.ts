import type { IExecuteFunctions } from 'n8n-workflow';
import BigNumber from 'bignumber.js';
import SetNetworkError from './errors/SetNetworkError';

const STELLAR_TESTNET_NETWORK = 'https://horizon-testnet.stellar.org/';
const STELLAR_TESTNET_PASSPHRASE = 'Test SDF Network ; September 2015';
const STELLAR_PUBNET_NETWORK = 'https://horizon.stellar.org/';
const STELLAR_PUBNET_PASSPHRASE = 'Public Global Stellar Network ; September 2015';
const STELLAR_FUTURENET_NETWORK = 'https://horizon-futurenet.stellar.org';
const STELLAR_FUTURENET_PASSPHRASE = 'Test SDF Future Network ; October 2022';

export async function setNetwork(this: IExecuteFunctions): Promise<StellarNetwork> {
	const credentials = await this.getCredentials('stellarNetworkApi');
	let stellarNetwork;

	switch (credentials.network) {
		case 'testnet':
			stellarNetwork = new StellarNetwork(STELLAR_TESTNET_NETWORK, STELLAR_TESTNET_PASSPHRASE);
			break;
		case 'pubnet':
			stellarNetwork = new StellarNetwork(STELLAR_PUBNET_NETWORK, STELLAR_PUBNET_PASSPHRASE);
			break;
		case 'futurenet':
			stellarNetwork = new StellarNetwork(STELLAR_FUTURENET_NETWORK, STELLAR_FUTURENET_PASSPHRASE);
			break;
		case 'custom':
			stellarNetwork = new StellarNetwork(
				credentials.networkUrl as string,
				credentials.networkPassphrase as string,
			);
	}

	if (stellarNetwork) {
		return stellarNetwork;
	} else {
		throw new SetNetworkError();
	}
}

class StellarNetwork {
	url: string;
	passphrase: string;

	constructor(networkUrl: string, networkPassphrase: string) {
		this.url = networkUrl;
		this.passphrase = networkPassphrase;
	}
}

export function convertAmountToBigNumber(amount: number): string {
	return new BigNumber(amount).toFixed(7).toString();
}
