import { IExecuteFunctions } from 'n8n-workflow';
import { Operation } from 'soroban-client';

export function revokeAccountSponsorship(this: IExecuteFunctions) {
	try {
		const account = this.getNodeParameter('account', 0) as string;
		const revokeAccountSponsorshipOperation = Operation.revokeAccountSponsorship({
			account,
		}).toXDR('base64');

		return { operation: revokeAccountSponsorshipOperation };
	} catch (error) {
		throw new Error(error);
	}
}
