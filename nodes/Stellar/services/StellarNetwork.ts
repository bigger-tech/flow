export default class StellarNetwork {
	url: string;
	passphrase: string;

	constructor(network: string) {
		const STELLAR_TESTNET_NETWORK = 'https://horizon-testnet.stellar.org/';
		const STELLAR_TESTNET_PASSPHRASE = 'Test SDF Network ; September 2015';
		const STELLAR_PUBNET_NETWORK = 'https://horizon.stellar.org/';
		const STELLAR_PUBNET_PASSPHRASE = 'Public Global Stellar Network ; September 2015';

		if (network === 'pubnet') {
			this.url = STELLAR_PUBNET_NETWORK;
			this.passphrase = STELLAR_PUBNET_PASSPHRASE;
		} else {
			this.url = STELLAR_TESTNET_NETWORK;
			this.passphrase = STELLAR_TESTNET_PASSPHRASE;
		}
	}
}
