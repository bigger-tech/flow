import { IExecuteFunctions } from 'n8n-workflow';
import { Operation } from 'soroban-client';

export async function claimClaimableBalance(this: IExecuteFunctions) {
	try {
		const balanceId = this.getNodeParameter('balanceId', 0) as string;
		const claimClaimableBalanceOperation = Operation.claimClaimableBalance({
			balanceId,
		}).toXDR('base64');
		return { operation: claimClaimableBalanceOperation };
	} catch (error) {
		throw new Error(error);
	}
}
