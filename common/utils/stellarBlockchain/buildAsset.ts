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
	if (assetValues.isNative) {
		return network === StellarPlatformEnum.SOROBAN ? SorobanAsset.native() : StellarAsset.native();
	} else {
		return network === StellarPlatformEnum.SOROBAN
			? new SorobanAsset(assetValues.code, assetValues.issuer)
			: new StellarAsset(assetValues.code, assetValues.issuer);
	}
}
