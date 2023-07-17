import { IExecuteFunctions } from 'n8n-workflow';
import AnclapCredentials from '../../../transport/AnclapCredentials';
import SEP6 from '../../../transport/SEP6';
import SEP24 from '../../../transport/SEP24';
import TransferServerRequest from '../../../transport/requests/TransferServerRequest/TransferServerRequest';
import { Protocol } from '../../../transport/types';

export async function transferServer(this: IExecuteFunctions) {
	const anclapCredentials = new AnclapCredentials(await this.getCredentials('anclapApi'));
	const protocol = this.getNodeParameter('protocol', 0) as Protocol;

	const getTransferServerInfo = async () => {
		const showOptionalValues = this.getNodeParameter('showOptionalValues', 0) as boolean;

		let transferServerRequest: TransferServerRequest;
		if (showOptionalValues) {
			const lang = this?.getNodeParameter('lang', 0) as string;

			transferServerRequest = new TransferServerRequest({ lang });
		}

		async function getSep24Info() {
			const sep24 = new SEP24(anclapCredentials, '');
			return await sep24.getInfo(transferServerRequest);
		}

		async function getSep6Info() {
			const sep6 = new SEP6(anclapCredentials, '');
			return await sep6.getInfo(transferServerRequest);
		}

		if (protocol === 'sep24') {
			return await getSep24Info();
		} else {
			return await getSep6Info();
		}
	};

	return await getTransferServerInfo();
}
