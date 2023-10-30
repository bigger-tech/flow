import { IExecuteFunctions } from 'n8n-core';
import MykoboCredentials from '../../../transport/MykoboCredentials';
import { Protocol } from '../../../transport/enums/protocol';
import FeeRequest from '../../../transport/requests/FeeRequest/FeeRequest';
import getProtocolProvider from '../../../transport/providers/protocolProvider';
import { OffChainOperationType, TransactionType } from '../../../transport/types';

export async function getFeeAmount(this: IExecuteFunctions) {
	const mykoboCredentials = new MykoboCredentials(await this.getCredentials('mykoboApi'));
	const token = this.getNodeParameter('token', 0) as string;
	const protocol = this.getNodeParameter('protocol', 0) as Protocol;
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
