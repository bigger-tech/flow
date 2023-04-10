import { IExecuteFunctions } from 'n8n-workflow';
import { Operation } from 'stellar-sdk';

export async function claimClaimableBalance(this: IExecuteFunctions) {
	const balanceId = this.getNodeParameter('balanceId', 0) as string;
	const claimClaimableBalanceOperation = Operation.claimClaimableBalance({
		balanceId,
	});
	return { operation: claimClaimableBalanceOperation };
}
