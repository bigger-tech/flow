import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Operation } from 'stellar-sdk';
import { convertAmountToBigNumber } from '../../../transport';
import IAsset from '../../entities/IAsset';

export async function makePayment(this: IExecuteFunctions) {
	const destinationAccount = this.getNodeParameter('destinationAccount', 0) as string;
	const isNative = this.getNodeParameter('isNative', 0) as boolean;
	const paymentAmount = this.getNodeParameter('amount', 0) as number;
	let asset: Asset;

	if (isNative) {
		asset = Asset.native();
	} else {
		const destinationAsset = this.getNodeParameter('destinationAsset', 0) as IAsset;
		asset = new Asset(destinationAsset.values.code, destinationAsset.values.issuer);
	}
	const amount = convertAmountToBigNumber(paymentAmount);

	const paymentOptions = { amount, asset, destination: destinationAccount };
	const paymentOperation = Operation.payment(paymentOptions);
	return { paymentOperation: paymentOperation };
}
