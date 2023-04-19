import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Operation } from 'stellar-sdk';
import { convertAmountToBigNumber } from '../../../transport';
import IAsset from '../../entities/IAsset';

export async function pathPaymentStrictReceive(this: IExecuteFunctions) {
	try {
		const destination = this.getNodeParameter('destinationAccount', 0) as string;
		const isSendingAssetNative = this.getNodeParameter('isSendingAssetNative', 0) as boolean;
		let sendAsset: Asset;
		let path: Asset[] = [];
		if (isSendingAssetNative) {
			sendAsset = Asset.native();
		} else {
			const sendingAsset = this.getNodeParameter('sendingAsset', 0) as IAsset;
			sendAsset = new Asset(sendingAsset.values.code, sendingAsset.values.issuer);
		}

		const maxSendingAmount = this.getNodeParameter('maxSendAmount', 0) as number;
		const sendMax = convertAmountToBigNumber(maxSendingAmount);

		const intermediateAssets = this.getNodeParameter('intermediatePathAssets', 0, []) as any;
		intermediateAssets.forEach((asset: any) => {
			if (asset.native) {
				path.push(Asset.native());
			} else {
				path.push(new Asset(asset.customAsset.values.code, asset.customAsset.values.issuer));
			}
		});

		const isDestinationAssetNative = this.getNodeParameter(
			'isDestinationAssetNative',
			0,
		) as boolean;
		let destAsset: Asset;
		if (isDestinationAssetNative) {
			destAsset = Asset.native();
		} else {
			const destinationAsset = this.getNodeParameter('destinationAsset', 0) as IAsset;
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
		});
		return { pathPaymentStrictReceiveOperation: pathPaymentStrictReceiveOperation };
	} catch (error) {
		throw new Error(error);
	}
}
