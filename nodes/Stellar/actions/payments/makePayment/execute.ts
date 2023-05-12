import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Operation } from 'stellar-sdk';
import { checkAsset, convertAmountToBigNumber } from '../../../transport';
import IAsset from '../../entities/IAsset';

export async function makePayment(this: IExecuteFunctions) {
	try {
		const destination = this.getNodeParameter('destinationAccount', 0) as string;
		const destinationAsset = this.getNodeParameter('destinationAsset', 0) as IAsset;
		const paymentAmount = this.getNodeParameter('amount', 0) as number;
		let asset: Asset;

		checkAsset(destinationAsset);
		if (destinationAsset.values.isNative) {
			asset = Asset.native();
		} else {
			asset = new Asset(destinationAsset.values.code, destinationAsset.values.issuer);
		}

		const amount = convertAmountToBigNumber(paymentAmount);

		const paymentOperation = Operation.payment({ amount, asset, destination }).toXDR('base64');
		return { operation: paymentOperation };
	} catch (error) {
		throw new Error(error);
	}
}
