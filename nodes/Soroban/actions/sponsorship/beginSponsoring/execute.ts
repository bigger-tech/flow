import { IExecuteFunctions } from 'n8n-workflow';
import { Operation } from '@stellar/stellar-sdk';

export function beginSponsoring(this: IExecuteFunctions) {
	try {
		const sponsoredId = this.getNodeParameter('sponsoredId', 0) as string;
		const beginSponsoringOperation = Operation.beginSponsoringFutureReserves({ sponsoredId }).toXDR(
			'base64',
		);

		return { operation: beginSponsoringOperation };
	} catch (error) {
		throw new Error(error);
	}
}
