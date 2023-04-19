import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Operation } from 'stellar-sdk';
import { convertAmountToBigNumber } from '../../../transport';
import IAsset from '../../entities/IAsset';

export async function clawback(this: IExecuteFunctions) {
	try {
		const from = this.getNodeParameter('from', 0) as string;
		const isNative = this.getNodeParameter('isNative', 0) as boolean;
		const amountToBurn = this.getNodeParameter('amount', 0) as number;
		let asset: Asset;

		if (isNative) {
			asset = Asset.native();
		} else {
			const destinationAsset = this.getNodeParameter('destinationAsset', 0) as IAsset;
			asset = new Asset(destinationAsset.values.code, destinationAsset.values.issuer);
		}
		const amount = convertAmountToBigNumber(amountToBurn);
		const clawbackOperation = Operation.clawback({ asset, amount, from }).toXDR('base64');
		return { operation: clawbackOperation };
	} catch (error) {
		throw new Error(error);
	}
}
