import { IExecuteFunctions } from 'n8n-workflow';
import { Operation } from '@stellar/stellar-sdk';

export function revokeClaimableBalanceSponsorship(this: IExecuteFunctions) {
	try {
		const balanceId = this.getNodeParameter('balanceId', 0) as string;
		const revokeClaimableBalanceSponsorshipOperation = Operation.revokeClaimableBalanceSponsorship({
			balanceId,
		}).toXDR('base64');

		return { operation: revokeClaimableBalanceSponsorshipOperation };
	} catch (error) {
		throw new Error(error);
	}
}
