import { IExecuteFunctions } from 'n8n-workflow';
import AnclapCredentials from '../../../transport/AnclapCredentials';
import SEP6 from '../../../transport/SEP6';
import TransferServerRequest from '../../../transport/requests/TransferServerRequest/TransferServerRequest';

export async function transferServer(this: IExecuteFunctions) {
	const anclapCredentials = new AnclapCredentials(await this.getCredentials('anclapApi'));

	const getSep6TransferServerInfo = async () => {
		const sep6 = new SEP6(anclapCredentials, '');

		const showOptionalValues = this.getNodeParameter('showOptionalValues', 0) as boolean;

		if (showOptionalValues) {
			const lang = this?.getNodeParameter('lang', 0) as string;

			const transferServerRequest = new TransferServerRequest({
				lang,
			});
			return await sep6.getInfo(transferServerRequest);
		}
		return await sep6.getInfo();
	};

	return await getSep6TransferServerInfo();
}
