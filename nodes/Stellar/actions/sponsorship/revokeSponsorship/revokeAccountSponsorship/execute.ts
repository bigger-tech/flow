import { IExecuteFunctions } from 'n8n-workflow';
import { Operation } from 'stellar-sdk';

export async function revokeAccountSponsorship(this: IExecuteFunctions) {
	const account = this.getNodeParameter('account', 0) as string;
	const revokeAccountSponsorshipOperation = Operation.revokeAccountSponsorship({
		account,
	});
	return { operation: revokeAccountSponsorshipOperation };
}
