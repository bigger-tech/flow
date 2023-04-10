import { IExecuteFunctions } from 'n8n-workflow';
import { Operation } from 'stellar-sdk';

export async function endSponsoring(this: IExecuteFunctions) {
	const source = this.getNodeParameter('accountSponsoring', 0) as string;
	const endSponsoringOperation = Operation.endSponsoringFutureReserves({
		source,
	});
	return { operation: endSponsoringOperation };
}
