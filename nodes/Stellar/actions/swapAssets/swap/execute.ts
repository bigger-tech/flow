import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Server } from 'stellar-sdk';
import { setNetwork } from '../../../transport';
import IAssetParameter from './entities/IAssetParameter';
import ISlippageParameter from './entities/ISlippageParameter';
import { getSwapAssetsTransaction } from './helpers';

export async function swapAssets(this: IExecuteFunctions) {
	try {
		let sourceAsset: Asset;
		let destinationAssets: Asset;
		const stellarNetwork = await setNetwork.call(this);
		const server = new Server(stellarNetwork.url as string);
		const amount = this.getNodeParameter('amount', 1) as string;
		const publicKeyParam = this.getNodeParameter('publicKey', 1) as string;
		const slippageAmount = this.getNodeParameter('slippage', 1) as ISlippageParameter;
		const sourceAssetValues = this.getNodeParameter('sourceAsset', 1) as IAssetParameter;
		const destinationAssetValues = this.getNodeParameter('destinationAsset', 1) as IAssetParameter;

		if (sourceAssetValues.values.code === 'native') {
			sourceAsset = Asset.native();
		} else {
			sourceAsset = new Asset(sourceAssetValues.values.code, sourceAssetValues.values.issuer);
		}

		if (destinationAssetValues.values.code === 'native') {
			destinationAssets = Asset.native();
		} else {
			destinationAssets = new Asset(
				destinationAssetValues.values.code,
				destinationAssetValues.values.issuer,
			);
		}

		const xdr = await getSwapAssetsTransaction(
			server,
			stellarNetwork.passphrase,
			sourceAsset,
			destinationAssets,
			amount,
			publicKeyParam,
			slippageAmount.amount,
		);

		return { xdr };
	} catch (error) {
		throw new Error(error);
	}
}
