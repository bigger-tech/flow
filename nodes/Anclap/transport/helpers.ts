import { Asset, BASE_FEE, Operation, Server, TransactionBuilder, Memo } from 'stellar-sdk';
import { DepositAsset, WithdrawAsset } from './responses/IAnclapInfoResponse';
import { IAnclapWithdrawResponse } from './responses/responses';
import CryptoJS from 'crypto-js';

export function verifyAmount(asset: DepositAsset | WithdrawAsset, amount: string) {
	const minAmount = asset.min_amount;
	const parsedAmount = Number(amount);
	return parsedAmount >= minAmount;
}

export async function buildWithdrawTransaction(
	publicKey: string,
	withdrawInfo: IAnclapWithdrawResponse,
	networkUrl: string,
	networkPassphrase: string,
) {
	const server = new Server(networkUrl);
	const paymentOp = Operation.payment({
		destination: withdrawInfo.how,
		asset: getAsset(),
		amount: withdrawInfo.amount_in,
	});

	const transaction = new TransactionBuilder(await server.loadAccount(publicKey), {
		fee: BASE_FEE,
		networkPassphrase,
	})
		.setTimeout(30)
		.addOperation(paymentOp)
		.addMemo(getMemo());

	const transactionXdr = transaction.build().toXDR();

	return transactionXdr;

	function getAsset() {
		const issuerRegex = new RegExp(/[G][A-Z0-9]{55}/g);
		const assetCodeRegex = new RegExp(/iso4217:(\w+)/);
		const issuer = withdrawInfo.amount_in_asset.match(issuerRegex);
		const assetCode = withdrawInfo.amount_out_asset.match(assetCodeRegex);

		if (issuer && assetCode) {
			return new Asset(assetCode[1], issuer[0]);
		} else {
			throw new Error();
		}
	}

	function getMemo() {
		const memo = CryptoJS.SHA256(withdrawInfo.memo).toString(CryptoJS.enc.Hex);
		return Memo.hash(memo);
	}
}
