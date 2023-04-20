import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Server } from 'stellar-sdk';
import { setNetwork } from '../../../transport';
import IAssetParameter from './entities/IAssetParameter';
import ISlippageParameter from './entities/ISlippageParameter';
import { getSwapAssetsOperation } from './helpers';

export async function swapAssets(this: IExecuteFunctions) {
	try {
		const stellarNetwork = await setNetwork.call(this);
		const server = new Server(stellarNetwork.url as string);
		const amount = this.getNodeParameter('amount', 1) as string;
		const publicKeyParam = this.getNodeParameter('publicKey', 1) as string;
		const slippageAmount = this.getNodeParameter('slippage', 1) as ISlippageParameter;
		const isSourceAssetNative = this.getNodeParameter('isSourceAssetNative', 1) as boolean;
		const isDestinationAssetNative = this.getNodeParameter(
			'isDestinationAssetNative',
			1,
		) as boolean;

		let sourceAsset: Asset;
		let destinationAsset: Asset;
		let sourceAssetValues: IAssetParameter;
		let destinationAssetValues: IAssetParameter;

		if (isSourceAssetNative) {
			sourceAsset = Asset.native();
		} else {
			sourceAssetValues = this.getNodeParameter('sourceAsset', 1) as IAssetParameter;
			sourceAsset = new Asset(sourceAssetValues.values.code, sourceAssetValues.values.issuer);
		}

		if (isDestinationAssetNative) {
			destinationAsset = Asset.native();
		} else {
			destinationAssetValues = this.getNodeParameter('destinationAsset', 1) as IAssetParameter;
			destinationAsset = new Asset(
				destinationAssetValues.values.code,
				destinationAssetValues.values.issuer,
			);
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
