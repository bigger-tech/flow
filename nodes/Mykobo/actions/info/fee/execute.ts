import { IExecuteFunctions } from 'n8n-workflow';
import AnchorCredentials from '../../../../../common/repository/anchor/AnchorCredentials';
import { ProtocolEnum } from '../../../../../common/enum/anchor/protocolEnum';
import { TransactionType } from '../../../../../common/types/anchor/TransactionType';
import { OffChainOperationType } from '../../../../../common/types/anchor/OffChainOperationType';
import FeeRequest from '../../../../../common/requests/anchor/FeeRequest/FeeRequest';
import getProtocolProvider from '../../../../../common/repository/anchor/providers/protocolProvider';

export async function getFeeAmount(this: IExecuteFunctions) {
	const mykoboCredentials = new AnchorCredentials(await this.getCredentials('mykoboApi'));
	const token = this.getNodeParameter('token', 0) as string;
	const protocol = this.getNodeParameter('protocol', 0) as ProtocolEnum;
	const operationType = this.getNodeParameter('operationType', 0) as TransactionType;
	const type = this.getNodeParameter('type', 0) as OffChainOperationType;
	const assetCode = this.getNodeParameter('assetCode', 0) as string;
	const amount = this.getNodeParameter('amount', 0) as number;

	const request = new FeeRequest({
		operation: operationType,
		type,
		assetCode,
		amount,
	});

	const feeProvider = getProtocolProvider(mykoboCredentials, token, protocol);

	return await feeProvider.getFee(request);
}
