import { IExecuteFunctions } from 'n8n-workflow';
import MykoboCredentials from '../../../transport/MykoboCredentials';
import TransferServerRequest from '../../../transport/requests/TransferServerRequest/TransferServerRequest';
import { Protocol } from '../../../transport/enums/protocol';
import getProtocolProvider from '../../../transport/providers/protocolProvider';

export async function getTransferServer(this: IExecuteFunctions) {
	const mykoboCredentials = new MykoboCredentials(await this.getCredentials('mykoboApi'));
	const protocol = this.getNodeParameter('protocol', 0) as Protocol;

	const showOptionalValues = this.getNodeParameter('showOptionalValues', 0) as boolean;

	let transferServerRequest: TransferServerRequest = {};
	if (showOptionalValues) {
		const lang = this?.getNodeParameter('lang', 0) as string;

		transferServerRequest = new TransferServerRequest({ lang });
	}
	const transferServerProvider = getProtocolProvider(mykoboCredentials, '', protocol);

	return transferServerRequest
		? await transferServerProvider.getInfo(transferServerRequest)
		: await transferServerProvider.getInfo();
}
