import { BigNumber } from 'bignumber.js';
import { Asset } from "soroban-client";
import IAsset from "../entities/IAsset";
import NoAssetSelectedError from '../../transport/errors/NoAssetSelectedError';

export function convertAmountToBigNumber(amount: number): string {
	return new BigNumber(amount).toFixed(7).toString();
}

export function buildAsset(assetValues: IAsset['values']): Asset {
	let asset: Asset;
	if (!assetValues) throw new NoAssetSelectedError('An asset must be selected');
	if (assetValues.isNative) {
		asset = Asset.native();
	} else {
		asset = new Asset(assetValues.code, assetValues.issuer);
	}
	return asset;
}
