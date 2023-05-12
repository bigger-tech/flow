import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Server } from 'stellar-sdk';
import { checkAsset, setNetwork } from '../../../transport';
import IAsset from '../../entities/IAsset';
import ISlippageParameter from './entities/ISlippageParameter';
import { getSwapAssetsOperation } from './helpers';

export async function swapAssets(this: IExecuteFunctions) {
	try {
		const stellarNetwork = await setNetwork.call(this);
		const server = new Server(stellarNetwork.url as string);
		const amount = this.getNodeParameter('amount', 0) as string;
		const publicKeyParam = this.getNodeParameter('publicKey', 1) as string;
		const slippageAmount = this.getNodeParameter('slippage', 1) as ISlippageParameter;
		const sourceAssetValues = this.getNodeParameter('sourceAsset', 1) as IAsset;
		const destinationAssetValues = this.getNodeParameter('destinationValues', 1) as IAsset;

		let sourceAsset: Asset;
		let destinationAsset: Asset;

		checkAsset(sourceAssetValues);
		if (sourceAssetValues.values.isNative) {
			sourceAsset = Asset.native();
		} else {
			sourceAsset = new Asset(sourceAssetValues.values.code, sourceAssetValues.values.issuer);
		}

		checkAsset(destinationAssetValues);
		if (sourceAssetValues.values.isNative) {
			destinationAsset = Asset.native();
		} else {
			destinationAsset = new Asset(sourceAssetValues.values.code, sourceAssetValues.values.issuer);
		}

		const swapAssetOperation = await getSwapAssetsOperation(
			server,
			sourceAsset,
			destinationAsset,
			amount,
			publicKeyParam,
			slippageAmount.amount,
		);

		return { operation: swapAssetOperation };
	} catch (error) {
		throw new Error(error);
	}
}
