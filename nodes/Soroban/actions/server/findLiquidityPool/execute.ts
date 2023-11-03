import { IExecuteFunctions } from 'n8n-workflow';
import axios from 'axios';
import { SorobanNetwork } from '../../../transport';
import IAsset from '../../../../../common/interfaces/stellar/IAsset';
import IAssetsPath from '../../../../../common/interfaces/stellar/IAssetsPath';
import LiquidityPoolNotFoundError from '../../../../../common/errors/stellar/LiquidityPoolNotFoundError';

export async function findLiquidityPool(this: IExecuteFunctions) {
	const { url } = await SorobanNetwork.setNetwork.call(this);
	const liquiditPoolSearchType = this.getNodeParameter('liquiditPoolSearchType', 0) as string;
	const fetchUrl = `${url as string}/liquidity_pools`;
	let liquidityPools: any;

	switch (liquiditPoolSearchType) {
		case 'liquidityPoolForID':
			const liquidityPoolId = this.getNodeParameter('liquidityPoolId', 0) as string;
			try {
				const { data } = await axios.get(`${fetchUrl}/${liquidityPoolId}`);
				liquidityPools = data;
			} catch {
				throw new LiquidityPoolNotFoundError('Liquidity pool not found');
			}
			break;
		case 'liquidityPoolForAssets':
			const { values } = this.getNodeParameter('reserves', 0, []) as IAssetsPath;

			let param: string = 'reserves=';

			if (values)
				values.forEach((asset: IAsset['values']) => {
					if (asset.isNative) {
						param += `native,`;
					} else {
						param += `${asset.code}:${asset.issuer},`;
					}
				});
			try {
				const {
					data: {
						_embedded: { records },
					},
				} = await axios.get(`${fetchUrl}?${param.slice(0, -1)}`);

				liquidityPools = records;
			} catch {
				throw new LiquidityPoolNotFoundError('Liquidity pool not found');
			}
	}

	return { liquidityPool: liquidityPools };
}
