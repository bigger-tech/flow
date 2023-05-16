import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Operation } from 'stellar-sdk';
import { checkAsset, convertAmountToBigNumber } from '../../../transport';
import IAssetsPath from '../../entities/IAssetsPath';
import IAsset from '../../entities/IAsset';

export async function pathPaymentStrictReceive(this: IExecuteFunctions) {
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

		const maxSendingAmount = this.getNodeParameter('maxSendAmount', 0) as number;
		const sendMax = convertAmountToBigNumber(maxSendingAmount);

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

		const destinationAmount = this.getNodeParameter('destinationAmount', 0) as number;
		const destAmount = convertAmountToBigNumber(destinationAmount);

		let pathPaymentStrictReceiveOperation = Operation.pathPaymentStrictReceive({
			sendAsset,
			sendMax,
			destination,
			destAsset,
			destAmount,
			path,
		}).toXDR('base64');
		return { operation: pathPaymentStrictReceiveOperation };
	} catch (error) {
		throw new Error(error);
	}
}
