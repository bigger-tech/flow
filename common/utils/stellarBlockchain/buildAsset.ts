import { Asset as SorobanAsset } from 'soroban-client';
import { Asset as StellarAsset } from 'stellar-sdk';
import IAsset from '../../interfaces/stellarBlockchain/IAsset';
import NoAssetSelectedError from '../../errors/stellarBlockchain/NoAssetSelectedError';
import { NetworkEnum } from '../../enum/stellarBlockchain/networkEnum';

export function buildAsset(
	assetValues: IAsset['values'],
	network: NetworkEnum,
): SorobanAsset | StellarAsset {
	if (!assetValues) throw new NoAssetSelectedError('An asset must be selected');
	if (assetValues.isNative) {
		return network === NetworkEnum.SOROBAN ? SorobanAsset.native() : StellarAsset.native();
	} else {
		return network === NetworkEnum.SOROBAN
			? new SorobanAsset(assetValues.code, assetValues.issuer)
			: new StellarAsset(assetValues.code, assetValues.issuer);
	}
}
