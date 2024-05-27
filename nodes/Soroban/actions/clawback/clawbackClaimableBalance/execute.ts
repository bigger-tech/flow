import { IExecuteFunctions } from 'n8n-workflow';
import { Operation, Transaction } from '@stellar/stellar-sdk';

export async function clawbackClaimableBalance(this: IExecuteFunctions) {
	try {
		let balanceId = this.getNodeParameter('balanceId', 0) as string;
		const transaction = this.getNodeParameter('transaction', 0) as string;

		if (!transaction && !balanceId) {
			throw new Error('Either transaction xdr or claim claimable balance id must be provided');
		}

		if (!balanceId) {
			const txResult = new Transaction(transaction, 'base64');
			balanceId = txResult.getClaimableBalanceId(0);
		}

		const clawbackClaimableBalanceOperation = Operation.clawbackClaimableBalance({
			balanceId,
		}).toXDR('base64');

		return { operation: clawbackClaimableBalanceOperation };
	} catch (error) {
		throw new Error(error);
	}
}
