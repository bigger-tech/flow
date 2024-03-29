import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Operation } from 'soroban-client';
import { convertAmountToBigNumber } from '../../../../../common/utils/stellar/convertAmountToBigNumber';
import IAsset from '../../../../../common/interfaces/stellar/IAsset';
import { buildAsset } from '../../../../../common/utils/stellar/buildAsset';
import { StellarPlatformEnum } from '../../../../../common/enum/stellar/StellarPlatformEnum';

export async function makePayment(this: IExecuteFunctions) {
	try {
		const destination = this.getNodeParameter('destinationAccount', 0) as string;
		const { values: destinationAsset } = this.getNodeParameter('destinationAsset', 0) as IAsset;
		const paymentAmount = this.getNodeParameter('amount', 0) as number;

		const asset = buildAsset(destinationAsset, StellarPlatformEnum.SOROBAN) as Asset;
		const amount = convertAmountToBigNumber(paymentAmount);

		const paymentOperation = Operation.payment({ amount, asset, destination }).toXDR('base64');

		return { operation: paymentOperation };
	} catch (error) {
		throw new Error(error);
	}
}
