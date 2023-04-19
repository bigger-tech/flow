import { IExecuteFunctions } from 'n8n-workflow';
import { Operation } from 'stellar-sdk';

export async function clawbackClaimableBalance(this: IExecuteFunctions) {
	const balanceId = this.getNodeParameter('balanceId', 0) as string;
	const clawbackClaimableBalanceOperation = Operation.clawbackClaimableBalance({
		balanceId,
	}).toXDR('base64');
	return { operation: clawbackClaimableBalanceOperation };
}
