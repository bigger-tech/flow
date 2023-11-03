import { IExecuteFunctions } from 'n8n-workflow';
import AnchorCredentials from '../../../../../common/repository/anchor/AnchorCredentials';
import { ProtocolEnum } from '../../../../../common/enum/anchor/protocolEnum';
import TransferServerRequest from '../../../../../common/requests/anchor/TransferServerRequest/TransferServerRequest';
import getProtocolProvider from '../../../../../common/repository/anchor/providers/protocolProvider';

export async function getTransferServer(this: IExecuteFunctions) {
	const mykoboCredentials = new AnchorCredentials(await this.getCredentials('mykoboApi'));
	const protocol = this.getNodeParameter('protocol', 0) as ProtocolEnum;

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
