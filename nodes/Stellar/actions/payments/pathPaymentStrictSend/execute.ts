import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Operation } from 'stellar-sdk';
import { convertAmountToBigNumber } from '../../../transport';
import IAsset from '../../entities/IAsset';

export async function pathPaymentStrictSend(this: IExecuteFunctions) {
	const destination = this.getNodeParameter('destinationAccount', 0) as string;
	const isSendingAssetNative = this.getNodeParameter('isSendingAssetNative', 0) as boolean;
	let sendAsset: Asset;
	let path: Asset[] = [];
	if (isSendingAssetNative) {
		sendAsset = Asset.native();
	} else {
		const asset = this.getNodeParameter('sendingAsset', 0) as IAsset;
		sendAsset = new Asset(asset.sendingAsset.code, asset.sendingAsset.issuer);
	}

	const sendingAmount = this.getNodeParameter('sendAmount', 0) as number;
	const sendAmount = convertAmountToBigNumber(sendingAmount);

	const intermediateAssets = this.getNodeParameter('intermediatePathAssets', 0, []) as any;
	intermediateAssets.forEach((asset: any) => {
		if (asset.native) {
			path.push(Asset.native());
		} else {
			path.push(new Asset(asset.customAsset.asset.code, asset.customAsset.asset.issuer));
		}
	});

	const isDestinationAssetNative = this.getNodeParameter('isDestinationAssetNative', 0) as boolean;
	let destAsset: Asset;
	if (isDestinationAssetNative) {
		destAsset = Asset.native();
	} else {
		const asset = this.getNodeParameter('destinationAsset', 0) as IAsset;
		destAsset = new Asset(asset.destinationAsset.code, asset.destinationAsset.issuer);
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
	});
	return { pathPaymentStrictSendOperation: pathPaymentStrictSendOperation };
}
