import { IExecuteFunctions } from 'n8n-workflow';
import { Operation } from 'stellar-sdk';

export async function bumpSequence(this: IExecuteFunctions) {
	const bumpTo = this.getNodeParameter('bumpTo', 0) as string;
	const bumpSequenceOperation = Operation.bumpSequence({ bumpTo }).toXDR('base64');
	return { operation: bumpSequenceOperation };
}
