import { IExecuteFunctions } from 'n8n-workflow';
import { Operation } from 'stellar-sdk';
import { convertAmountToBigNumber } from '../../../transport';

export async function liquidityPoolWithdraw(this: IExecuteFunctions) {
	const liquidityPoolId = this.getNodeParameter('liquidityPoolId', 0) as string;
	const amountToWithdraw = this.getNodeParameter('amount', 0) as number;
	const amount = convertAmountToBigNumber(amountToWithdraw);
	const minAmountAToWithdraw = this.getNodeParameter('minAmountA', 0) as number;
	const minAmountA = convertAmountToBigNumber(minAmountAToWithdraw);
	const minAmountBToWithdraw = this.getNodeParameter('minAmountA', 0) as number;
	const minAmountB = convertAmountToBigNumber(minAmountBToWithdraw);

	const liquidityPoolWithdrawOperation = Operation.liquidityPoolWithdraw({
		liquidityPoolId,
		amount,
		minAmountA,
		minAmountB,
	}).toXDR('base64');
	return { operation: liquidityPoolWithdrawOperation };
}
