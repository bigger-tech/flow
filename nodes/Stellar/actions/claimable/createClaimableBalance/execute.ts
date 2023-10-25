import { IExecuteFunctions } from 'n8n-workflow';
import { Operation, Asset } from 'stellar-sdk';
import { buildAsset } from '../../../../../common/utils/stellarBlockchain/buildAsset';
import IAsset from '../../../../../common/interfaces/stellarBlockchain/IAsset';
import IClaimants from '../../../../../common/interfaces/stellarBlockchain/IClaimants';
import buildClaimantsList from './helpers/helpers';
import { convertAmountToBigNumber } from '../../../../../common/utils/stellarBlockchain/convertAmountToBigNumber';
import { StellarPlatformEnum } from '../../../../../common/enum/stellarBlockchain/StellarPlatformEnum';

export async function createClaimableBalance(this: IExecuteFunctions) {
	try {
		const { values: claimableAsset } = this.getNodeParameter('claimableAsset', 0) as IAsset;
		const claimableAmount = this.getNodeParameter('amount', 0) as number;
		const { values: claimantsValues } = this.getNodeParameter('claimants', 0) as IClaimants;

		const asset = buildAsset(claimableAsset, StellarPlatformEnum.STELLAR_CLASSIC) as Asset;
		const claimants = buildClaimantsList(claimantsValues);
		const amount = convertAmountToBigNumber(claimableAmount);

		const createClaimableBalanceOperation = Operation.createClaimableBalance({
			asset,
			amount,
			claimants,
		}).toXDR('base64');

		return { operation: createClaimableBalanceOperation };
	} catch (error) {
		throw new Error(error);
	}
}
