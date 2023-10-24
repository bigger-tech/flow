import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Operation } from 'stellar-sdk';
import { convertAmountToBigNumber } from '../../../../../common/utils/stellarBlockchain/convertAmountToBigNumber';
import IAssetsPath from '../../../../../common/interfaces/stellarBlockchain/IAssetsPath';
import IAsset from '../../../../../common/interfaces/stellarBlockchain/IAsset';
import { buildAsset } from '../../../../../common/utils/stellarBlockchain/buildAsset';
import { NetworkEnum } from '../../../../../common/enum/stellarBlockchain/networkEnum';

export async function pathPaymentStrictReceive(this: IExecuteFunctions) {
	try {
		const { values: sendingAsset } = this.getNodeParameter('sendingAsset', 0) as IAsset;
		const maxSendingAmount = this.getNodeParameter('maxSendAmount', 0) as number;
		const destination = this.getNodeParameter('destinationAccount', 0) as string;
		const { values: destinationAsset } = this.getNodeParameter('destinationAsset', 0) as IAsset;
		const destinationAmount = this.getNodeParameter('destinationAmount', 0) as number;
		const { values: intermediateAssets } = this.getNodeParameter(
			'intermediatePathAssets',
			0,
			[],
		) as IAssetsPath;

		const sendAsset = buildAsset(sendingAsset, NetworkEnum.STELLAR) as Asset;
		const sendMax = convertAmountToBigNumber(maxSendingAmount);
		const destAsset = buildAsset(destinationAsset, NetworkEnum.STELLAR) as Asset;
		const destAmount = convertAmountToBigNumber(destinationAmount);
		let path: Asset[] = [];

		intermediateAssets.forEach((asset) => {
			const intermediateAsset = buildAsset(asset, NetworkEnum.STELLAR) as Asset;
			path.push(intermediateAsset);
		});

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
