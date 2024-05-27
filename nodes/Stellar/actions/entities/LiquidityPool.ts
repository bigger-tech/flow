import { Horizon } from '@stellar/stellar-sdk';
import ILiquidityPool from '../../../../common/interfaces/stellar/ILiquidityPool';
import ILiquidityPoolReserve from '../../../../common/interfaces/stellar/ILiquidityPoolReserve';

export default class LiquidityPool implements ILiquidityPool {
	public id: string;
	public feeBp: number;
	public totalTrustlines: string;
	public totalShares: string;
	public reserves: ILiquidityPoolReserve[];
	public link: string;
	constructor(
		id: string,
		fee_bp: number,
		total_trustlines: string,
		total_shares: string,
		reserves: ILiquidityPoolReserve[],
		self: Horizon.HorizonApi.ResponseLink,
	) {
		this.id = id;
		this.feeBp = fee_bp;
		this.totalTrustlines = total_trustlines;
		this.totalShares = total_shares;
		this.reserves = reserves;
		this.link = self.href;
	}
}
