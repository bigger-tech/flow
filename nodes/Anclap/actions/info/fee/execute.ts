import { IExecuteFunctions } from 'n8n-core';
import AnclapCredentials from '../../../transport/AnclapCredentials';
import { OffChainOperationType, Protocol, TransactionType } from '../../../transport/types';
import SEP6 from '../../../transport/SEP6';
import SEP24 from '../../../transport/SEP24';
import FeeRequest from '../../../transport/requests/FeeRequest/FeeRequest';

export async function fee(this: IExecuteFunctions) {
	const anclapCredentials = new AnclapCredentials(await this.getCredentials('anclapApi'));
	const token = this.getNodeParameter('token', 0) as string;
	const protocol = this.getNodeParameter('protocol', 0) as Protocol;

	const getFeeAmount = async () => {
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

		async function getSep24Fee() {
			const sep24 = new SEP24(anclapCredentials, token);
			return await sep24.getFee(request);
		}

		async function getSep6Fee() {
			const sep6 = new SEP6(anclapCredentials, token);
			return await sep6.getFee(request);
		}

		if (protocol === 'sep24') {
			return await getSep24Fee();
		} else {
			return await getSep6Fee();
		}
	};

	return await getFeeAmount();
}
