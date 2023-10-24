import type { IExecuteFunctions, ITriggerFunctions } from 'n8n-workflow';
import BigNumber from 'bignumber.js';
import SetNetworkError from './errors/SetNetworkError';
import NoAssetSelectedError from './errors/NoAssetSelectedError';
import IAsset from '../actions/entities/IAsset';
import { Asset } from 'soroban-client';

const SOROBAN_FUTURENET_NETWORK = 'https://horizon-futurenet.stellar.org';
const SOROBAN_FUTURENET_PASSPHRASE = 'Test SDF Future Network ; October 2022';

export class SorobanNetwork {
  url: string;
  passphrase: string;

  constructor(networkUrl: string, networkPassphrase: string) {
    this.url = networkUrl;
    this.passphrase = networkPassphrase;
  }

  static async setNetwork(
    this: IExecuteFunctions | ITriggerFunctions
  ): Promise<SorobanNetwork> {
    const credentials = await this.getCredentials('sorobanNetworkApi');
    let sorobanNetwork;

    switch (credentials.network) {
      case 'futurenet':
        sorobanNetwork = new SorobanNetwork(SOROBAN_FUTURENET_NETWORK, SOROBAN_FUTURENET_PASSPHRASE);
        break;
      case 'custom':
        sorobanNetwork = new SorobanNetwork(
          credentials.networkUrl as string,
          credentials.networkPassphrase as string
        );
    }

    if (sorobanNetwork) {
      return sorobanNetwork;
    } else {
      throw new SetNetworkError();
    }
  }
}

export function convertAmountToBigNumber(amount: number): string {
	return new BigNumber(amount).toFixed(7).toString();
}

export function buildAsset(assetValues: IAsset['values']): Asset {
	let asset: Asset;
	if (!assetValues) throw new NoAssetSelectedError('An asset must be selected');
	if (assetValues.isNative) {
		asset = Asset.native();
	} else {
		asset = new Asset(assetValues.code, assetValues.issuer);
	}
	return asset;
}
