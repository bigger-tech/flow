import { IExecuteFunctions } from 'n8n-workflow';
import { SorobanRpc, Asset } from '@stellar/stellar-sdk';
import { SorobanNetwork } from '../../../transport';
import IAsset from '../../../../../common/interfaces/stellar/IAsset';
import ISlippageParameter from './entities/ISlippageParameter';
import { getSwapAssetsOperation } from './helpers';
import { StellarPlatformEnum } from '../../../../../common/enum/stellar/StellarPlatformEnum';
import { buildAsset } from '../../../../../common/utils/stellar/buildAsset';

export async function swapAssets(this: IExecuteFunctions) {
	const stellarNetwork = await SorobanNetwork.setNetwork.call(this);
	const server = new SorobanRpc.Server(stellarNetwork.url as string);
	const amount = this.getNodeParameter('amount', 0) as string;
	const publicKeyParam = this.getNodeParameter('publicKey', 0) as string;
	const { amount: slippageAmount } = this.getNodeParameter('slippage', 0) as ISlippageParameter;
	const { values: sourceAssetValues } = this.getNodeParameter('sourceAsset', 0) as IAsset;
	const { values: destinationAssetValues } = this.getNodeParameter('destinationAsset', 0) as IAsset;

	const sourceAsset = buildAsset(sourceAssetValues, StellarPlatformEnum.SOROBAN) as Asset;
	const destinationAsset = buildAsset(destinationAssetValues, StellarPlatformEnum.SOROBAN) as Asset;

	const swapAssetOperation = await getSwapAssetsOperation(
		server,
		sourceAsset,
		destinationAsset,
		amount,
		publicKeyParam,
		slippageAmount,
	);

	return { operation: swapAssetOperation };
}
