import { IExecuteFunctions } from 'n8n-workflow';
import { Operation, Transaction } from 'soroban-client';

export async function claimClaimableBalance(this: IExecuteFunctions) {
	try {
		let balanceId = this.getNodeParameter('balanceId', 0) as string;
		const transaction = this.getNodeParameter('transaction', 0) as string;

		if (!transaction && !balanceId) {
			throw new Error('Either transaction or balanceId must be provided');
		}

		if (!balanceId) {
			const txResult = new Transaction(transaction, 'base64');
			balanceId = txResult.getClaimableBalanceId(0);
		}

		const claimClaimableBalanceOperation = Operation.claimClaimableBalance({
			balanceId,
		}).toXDR('base64');

		return { operation: claimClaimableBalanceOperation };
	} catch (error) {
		throw new Error(error);
	}
}
