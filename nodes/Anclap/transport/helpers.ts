import { Asset, Operation, Server, TransactionBuilder, Memo } from 'stellar-sdk';
import { DepositAsset, WithdrawAsset } from './responses/IAnclapInfoResponse';
import { IAnclapWithdrawResponse } from './responses/responses';
import GetAssetError from './errors/GetAssetError';

export function verifyAmount(asset: DepositAsset | WithdrawAsset, amount: string): boolean {
	const minAmount = asset.min_amount;
	return Number(amount) >= minAmount;
}

export async function buildWithdrawTransaction(
	publicKey: string,
	withdrawInfo: IAnclapWithdrawResponse,
	networkUrl: string,
	networkPassphrase: string,
): Promise<string> {
	const server = new Server(networkUrl);
	const fee = (await server.feeStats()).fee_charged.p90;
	const paymentOp = Operation.payment({
		destination: withdrawInfo.how,
		asset: getAsset(),
		amount: withdrawInfo.amount_in,
	});

	return new TransactionBuilder(await server.loadAccount(publicKey), {
		fee,
		networkPassphrase,
	})
		.setTimeout(100)
		.addOperation(paymentOp)
		.addMemo(getMemo())
		.build()
		.toXDR();

	function getAsset(): Asset {
		const issuerRegex = new RegExp(/[G][A-Z0-9]{55}/g);
		const assetCodeRegex = new RegExp(/iso4217:(\w+)/);
		const issuer = withdrawInfo.amount_in_asset.match(issuerRegex);
		const assetCode = withdrawInfo.amount_out_asset.match(assetCodeRegex);

		if (issuer && assetCode) {
			return new Asset(assetCode[1], issuer[0]);
		} else {
			throw new GetAssetError('Invalid asset');
		}
	}

	function getMemo(): Memo<'hash'> {
		const buffer = Buffer.from(withdrawInfo.memo, 'base64');
		const hex = buffer.toString('hex');

		return Memo.hash(hex);
	}
}
