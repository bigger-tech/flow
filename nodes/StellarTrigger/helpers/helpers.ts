import IAssetParam from '../IAssetParam';

export function validateTx(tx: any, assets: IAssetParam): boolean {
	if (assets.values) {
		let assetCodes: string[] = [];
		let assetIssuers: string[] = [];

		for (const asset of assets.values) {
			if (asset.code) assetCodes.push(asset.code);
			if (asset.issuer) assetIssuers.push(asset.issuer);
		}

		if (!assetCodes.length && !assetIssuers.length) {
			throw Error('Should type assets or disable the option');
		}

		if (assetCodes.length && assetCodes.includes(tx.asset_code || tx.asset_type)) return true;
		if (assetIssuers.length && assetIssuers.includes(tx.asset_issuer)) return true;

		return false;
	} else {
		return true;
	}
}
