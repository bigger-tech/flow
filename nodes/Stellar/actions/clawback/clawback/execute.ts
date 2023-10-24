import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Operation } from 'stellar-sdk';
import { convertAmountToBigNumber } from '../../../../../common/utils/stellarBlockchain/convertAmountToBigNumber';
import IAsset from '../../../../../common/interfaces/stellarBlockchain/IAsset';
import { NetworkEnum } from '../../../../../common/enum/stellarBlockchain/networkEnum';
import { buildAsset } from '../../../../../common/utils/stellarBlockchain/buildAsset';

export async function clawback(this: IExecuteFunctions) {
	try {
		const from = this.getNodeParameter('from', 0) as string;
		const { values: assetToBurn } = this.getNodeParameter('assetToBurn', 0) as IAsset;
		const amountToBurn = this.getNodeParameter('amount', 0) as number;

		const amount = convertAmountToBigNumber(amountToBurn);
		const asset = buildAsset(assetToBurn, NetworkEnum.STELLAR) as Asset;
		const clawbackOperation = Operation.clawback({ asset, amount, from }).toXDR('base64');

		return { operation: clawbackOperation };
	} catch (error) {
		throw new Error(error);
	}
}
