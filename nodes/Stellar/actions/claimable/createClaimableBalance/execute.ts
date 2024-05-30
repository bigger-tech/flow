import { IExecuteFunctions } from 'n8n-workflow';
import { Operation, Asset } from '@stellar/stellar-sdk';
import { buildAsset } from '../../../../../common/utils/stellar/buildAsset';
import IAsset from '../../../../../common/interfaces/stellar/IAsset';
import IClaimants from '../../../../../common/interfaces/stellar/IClaimants';
import buildClaimantsList from './helpers/helpers';
import { convertAmountToBigNumber } from '../../../../../common/utils/stellar/convertAmountToBigNumber';

export async function createClaimableBalance(this: IExecuteFunctions) {
	try {
		const { values: claimableAsset } = this.getNodeParameter('claimableAsset', 0) as IAsset;
		const claimableAmount = this.getNodeParameter('amount', 0) as number;
		const { values: claimantsValues } = this.getNodeParameter('claimants', 0) as IClaimants;

		const asset = buildAsset(claimableAsset) as Asset;
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
