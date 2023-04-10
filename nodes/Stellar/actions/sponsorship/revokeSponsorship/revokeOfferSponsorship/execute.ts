import { IExecuteFunctions } from 'n8n-workflow';
import { Operation } from 'stellar-sdk';

export async function revokeOfferSponsorship(this: IExecuteFunctions) {
	const seller = this.getNodeParameter('seller', 0) as string;
	const offerId = this.getNodeParameter('offerId', 0) as string;
	const revokeOfferSponsorshipOperation = Operation.revokeOfferSponsorship({
		seller,
		offerId,
	});
	return { operation: revokeOfferSponsorshipOperation };
}
