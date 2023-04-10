import { IExecuteFunctions } from 'n8n-workflow';
import { Operation } from 'stellar-sdk';

export async function accountMerge(this: IExecuteFunctions) {
	const destination = this.getNodeParameter('destinationAccount', 0) as string;

	const accountMergeOperation = Operation.accountMerge({ destination });
	return { operation: accountMergeOperation };
}
