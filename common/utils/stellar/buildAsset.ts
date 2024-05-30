import { Asset } from '@stellar/stellar-sdk';
import IAsset from '../../interfaces/stellar/IAsset';
import NoAssetSelectedError from '../../errors/stellar/NoAssetSelectedError';

export function buildAsset(assetValues: IAsset['values']): Asset {
	if (!assetValues) throw new NoAssetSelectedError('An asset must be selected');

	if (assetValues.isNative) {
		return Asset.native();
	} else {
		return new Asset(assetValues.code, assetValues.issuer);
	}
}
