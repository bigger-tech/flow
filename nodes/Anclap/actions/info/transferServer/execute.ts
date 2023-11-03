import { IExecuteFunctions } from 'n8n-workflow';
import AnchorCredentials from '../../../../../common/repository/anchor/AnchorCredentials';
import TransferServerRequest from '../../../../../common/requests/anchor/TransferServerRequest/TransferServerRequest';
import getProtocolProvider from '../../../../../common/repository/anchor/providers/protocolProvider';
import { ProtocolEnum } from '../../../../../common/enum/anchor/protocolEnum';

export async function getTransferServer(this: IExecuteFunctions) {
	const anclapCredentials = new AnchorCredentials(await this.getCredentials('anclapApi'));
	const protocol = this.getNodeParameter('protocol', 0) as ProtocolEnum;

	const showOptionalValues = this.getNodeParameter('showOptionalValues', 0) as boolean;

	let transferServerRequest: TransferServerRequest = {};
	if (showOptionalValues) {
		const lang = this?.getNodeParameter('lang', 0) as string;

		transferServerRequest = new TransferServerRequest({ lang });
	}
	const transferServerProvider = getProtocolProvider(anclapCredentials, '', protocol);

	return transferServerRequest
		? await transferServerProvider.getInfo(transferServerRequest)
		: await transferServerProvider.getInfo();
}
