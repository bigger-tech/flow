import { IExecuteFunctions } from 'n8n-workflow';
import { Horizon, Asset } from '@stellar/stellar-sdk';
import { setNetwork } from '../../../transport';
import IAsset from '../../../../../common/interfaces/stellar/IAsset';
import ISlippageParameter from './entities/ISlippageParameter';
import { getSwapAssetsOperation } from './helpers';
import { StellarPlatformEnum } from '../../../../../common/enum/stellar/StellarPlatformEnum';
import { buildAsset } from '../../../../../common/utils/stellar/buildAsset';

export async function swapAssets(this: IExecuteFunctions) {
	try {
		const stellarNetwork = await setNetwork.call(this);
		const server = new Horizon.Server(stellarNetwork.url as string);
		const amount = this.getNodeParameter('amount', 0) as string;
		const publicKey = this.getNodeParameter('publicKey', 0) as string;
		const { amount: slippageAmount } = this.getNodeParameter('slippage', 0) as ISlippageParameter;
		const { values: sourceAssetValues } = this.getNodeParameter('sourceAsset', 0) as IAsset;
		const { values: destinationAssetValues } = this.getNodeParameter(
			'destinationAsset',
			0,
		) as IAsset;

		const sourceAsset = buildAsset(sourceAssetValues, StellarPlatformEnum.STELLAR_CLASSIC) as Asset;
		const destinationAsset = buildAsset(
			destinationAssetValues,
			StellarPlatformEnum.STELLAR_CLASSIC,
		) as Asset;

		const swapAssetOperation = await getSwapAssetsOperation(
			server,
			sourceAsset,
			destinationAsset,
			amount,
			publicKey,
			slippageAmount,
		);

		return { operation: swapAssetOperation };
	} catch (error) {
		throw new Error(error);
	}
}
