import IAssetParam from '../IAssetParam';

export function validateTx(tx: any, assets: IAssetParam): boolean {
	if (!assets.values) {
		return true;
	}

	const assetCodes = assets.values.map((asset) => asset.code).filter(Boolean);
	const assetIssuers = assets.values.map((asset) => asset.issuer).filter(Boolean);

	return (
		assetCodes.includes(tx.asset_code || tx.asset_type) || assetIssuers.includes(tx.asset_issuer)
	);
}
