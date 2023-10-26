import type { IExecuteFunctions, ITriggerFunctions } from 'n8n-workflow';
import SetNetworkError from '../../../common/errors/stellar/SetNetworkError';

const SOROBAN_HORIZON_RPC_NETWORK = 'https://horizon-futurenet.stellar.org';
const SOROBAN_HORIZON_RPC_PASSPHRASE = 'Test SDF Future Network ; October 2022';
const SOROBAN_SOROBAN_RPC_NETWORK = 'https://rpc-futurenet.stellar.org';
const SOROBAN_SOROBAN_RPC_PASSPHRASE = 'Test SDF Future Network ; October 2022';

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
			case 'sorobanRpc':
				sorobanNetwork = new SorobanNetwork(
					SOROBAN_SOROBAN_RPC_NETWORK,
					SOROBAN_SOROBAN_RPC_PASSPHRASE,
				);
				break;
			case 'horizonRpc':
				sorobanNetwork = new SorobanNetwork(
					SOROBAN_HORIZON_RPC_NETWORK,
					SOROBAN_HORIZON_RPC_PASSPHRASE,
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
