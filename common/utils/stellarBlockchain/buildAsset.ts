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

	const asset = network === StellarPlatformEnum.SOROBAN ? SorobanAsset : StellarAsset;

	if (assetValues.isNative) {
		return asset.native();
	} else {
		return new asset(assetValues.code, assetValues.issuer);
	}
}
