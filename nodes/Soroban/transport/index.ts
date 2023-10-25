import type { IExecuteFunctions, ITriggerFunctions } from 'n8n-workflow';
import SetNetworkError from '../../../common/errors/stellar/SetNetworkError';

const SOROBAN_FUTURENET_NETWORK = 'https://horizon-futurenet.stellar.org';
const SOROBAN_FUTURENET_PASSPHRASE = 'Test SDF Future Network ; October 2022';

export class SorobanNetwork {
	url: string;
	passphrase: string;

	constructor(networkUrl: string, networkPassphrase: string) {
		this.url = networkUrl;
		this.passphrase = networkPassphrase;
	}

	static async setNetwork(this: IExecuteFunctions | ITriggerFunctions): Promise<SorobanNetwork> {
		const { network, networkUrl, networkPassphrase } = await this.getCredentials(
			'sorobanNetworkApi',
		);

		let sorobanNetwork;

		switch (network) {
			case 'futurenet':
				sorobanNetwork = new SorobanNetwork(
					SOROBAN_FUTURENET_NETWORK,
					SOROBAN_FUTURENET_PASSPHRASE,
				);
				break;
			case 'custom':
				sorobanNetwork = new SorobanNetwork(networkUrl as string, networkPassphrase as string);
		}

		if (sorobanNetwork) {
			return sorobanNetwork;
		} else {
			throw new SetNetworkError();
		}
	}
}
