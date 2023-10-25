import { Asset as SorobanAsset } from 'soroban-client';
import { Asset as StellarAsset } from 'stellar-sdk';
import IAsset from '../../interfaces/stellarBlockchain/IAsset';
import NoAssetSelectedError from '../../errors/stellarBlockchain/NoAssetSelectedError';
import { StellarPlatformEnum } from '../../enum/stellarBlockchain/StellarPlatformEnum';

export function buildAsset(
	assetValues: IAsset['values'],
	network: StellarPlatformEnum,
): SorobanAsset | StellarAsset {
	if (!assetValues) throw new NoAssetSelectedError('An asset must be selected');

	const Asset = network === StellarPlatformEnum.SOROBAN ? SorobanAsset : StellarAsset;

	if (assetValues.isNative) {
		return Asset.native();
	} else {
		return new Asset(assetValues.code, assetValues.issuer);
	}
}
