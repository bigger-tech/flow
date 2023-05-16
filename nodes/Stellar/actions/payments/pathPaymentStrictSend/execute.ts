import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Operation } from 'stellar-sdk';
import { checkAsset, convertAmountToBigNumber } from '../../../transport';
import IAssetsPath from '../../entities/IAssetsPath';
import IAsset from '../../entities/IAsset';

export async function pathPaymentStrictSend(this: IExecuteFunctions) {
	try {
		const destination = this.getNodeParameter('destinationAccount', 0) as string;

		const sendingAsset = this.getNodeParameter('sendingAsset', 0) as IAsset;
		let sendAsset: Asset;
		checkAsset(sendingAsset);
		if (sendingAsset.values.isNative) {
			sendAsset = Asset.native();
		} else {
			sendAsset = new Asset(sendingAsset.values.code, sendingAsset.values.issuer);
		}

		const sendingAmount = this.getNodeParameter('sendAmount', 0) as number;
		const sendAmount = convertAmountToBigNumber(sendingAmount);

		let path: Asset[] = [];
		const intermediateAssets = this.getNodeParameter(
			'intermediatePathAssets',
			0,
			[],
		) as IAssetsPath;

		intermediateAssets.values.forEach((asset: IAsset['values']) => {
			let intermediateAsset: Asset;
			if (asset.isNative) {
				intermediateAsset = Asset.native();
			} else {
				intermediateAsset = new Asset(asset.code, asset.issuer);
			}
			path.push(intermediateAsset);
		});

		const destinationAsset = this.getNodeParameter('destinationAsset', 0) as IAsset;
		let destAsset: Asset;
		checkAsset(destinationAsset);
		if (destinationAsset.values.isNative) {
			destAsset = Asset.native();
		} else {
			destAsset = new Asset(destinationAsset.values.code, destinationAsset.values.issuer);
		}

		const minDestinationAmount = this.getNodeParameter('minDestinationAmount', 0) as number;
		const destMin = convertAmountToBigNumber(minDestinationAmount);

		let pathPaymentStrictSendOperation = Operation.pathPaymentStrictSend({
			sendAsset,
			sendAmount,
			destination,
			destAsset,
			destMin,
			path,
		}).toXDR('base64');
		return { operation: pathPaymentStrictSendOperation };
	} catch (error) {
		throw new Error(error);
	}
}
