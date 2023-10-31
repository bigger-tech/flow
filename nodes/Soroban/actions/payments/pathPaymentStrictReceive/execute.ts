import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Operation } from 'soroban-client';
import { convertAmountToBigNumber } from '../../../../../common/utils/stellar/convertAmountToBigNumber';
import IAssetsPath from '../../../../../common/interfaces/stellar/IAssetsPath';
import IAsset from '../../../../../common/interfaces/stellar/IAsset';
import { buildAsset } from '../../../../../common/utils/stellar/buildAsset';
import { StellarPlatformEnum } from '../../../../../common/enum/stellar/StellarPlatformEnum';

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

		const sendAsset = buildAsset(sendingAsset, StellarPlatformEnum.SOROBAN) as Asset;
		const sendMax = convertAmountToBigNumber(maxSendingAmount);
		const destAsset = buildAsset(destinationAsset, StellarPlatformEnum.SOROBAN) as Asset;
		const destAmount = convertAmountToBigNumber(destinationAmount);
		let path: Asset[] = [];

		intermediateAssets.forEach((asset) => {
			const intermediateAsset = buildAsset(asset, StellarPlatformEnum.SOROBAN) as Asset;
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
