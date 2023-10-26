import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Operation } from 'soroban-client';
import { convertAmountToBigNumber } from '../../../../../common/utils/stellar/convertAmountToBigNumber';
import IAsset from '../../../../../common/interfaces/stellar/IAsset';
import { StellarPlatformEnum } from '../../../../../common/enum/stellar/StellarPlatformEnum';
import { buildAsset } from '../../../../../common/utils/stellar/buildAsset';

export async function clawback(this: IExecuteFunctions) {
	try {
		const from = this.getNodeParameter('from', 0) as string;
		const { values: assetToBurn } = this.getNodeParameter('assetToBurn', 0) as IAsset;
		const amountToBurn = this.getNodeParameter('amount', 0) as number;

		const amount = convertAmountToBigNumber(amountToBurn);
		const asset = buildAsset(assetToBurn, StellarPlatformEnum.SOROBAN) as Asset;
		const clawbackOperation = Operation.clawback({ asset, amount, from }).toXDR('base64');

		return { operation: clawbackOperation };
	} catch (error) {
		throw new Error(error);
	}
}
