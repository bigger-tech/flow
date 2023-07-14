import {
	Asset,
	Operation,
	Server,
	TransactionBuilder,
	Memo,
	Transaction,
	Keypair,
} from 'stellar-sdk';
import { DepositAsset, WithdrawAsset } from './responses/IAnclapTransferServerInfoResponse';
import { IAnclapWithdrawResponse, IAnclapTomlResponse } from './responses/responses';
import GetAssetError from './errors/GetAssetError';
import GetChallengeValidationError from './errors/GetChallengeValidationError';
import AnclapCredentials from './AnclapCredentials';
import { networkPassphrase } from './enums/networkPassphrase';

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

export async function validateXdrProvenance(
	anchor: IAnclapTomlResponse,
	challengeXdr: string,
	clientPublicKey: string,
): Promise<object> {
	const transaction = new Transaction(challengeXdr, 'base64');
	const anchorHomeDomain = extractHomeDomain(anchor.WEB_AUTH_ENDPOINT);

	if (transaction.sequence !== '0')
		throw new GetChallengeValidationError('Invalid sequence number');

	if (transaction.source !== anchor.SIGNING_KEY)
		throw new GetChallengeValidationError('Transaction must be signed by the Server');

	const operations = transaction.operations;
	const firstManageDataOperation = operations[0] as Operation.ManageData;

	if (firstManageDataOperation.source !== clientPublicKey)
		throw new GetChallengeValidationError(
			'First manage data operation must have Source account set to the Client Account',
		);

	if (firstManageDataOperation.name !== `${anchorHomeDomain} auth`)
		throw new GetChallengeValidationError(
			`First manage data operation must have Key set to ${anchorHomeDomain} auth`,
		);

	const webAuthDomain = [] as Operation.ManageData[];
	for (let operation of operations) {
		operation = operation as Operation.ManageData;
		if (operation.name === 'web_auth_domain') webAuthDomain.push(operation);
	}

	if (webAuthDomain.length <= 0 || webAuthDomain[0]?.source !== anchor.SIGNING_KEY)
		throw new GetChallengeValidationError(
			`Source account in manageData must be set to the Server account: ${anchor.SIGNING_KEY}`,
		);

	if (
		webAuthDomain.length >= 1 &&
		!webAuthDomain.every(
			(operation) => Buffer.from(operation.value ?? '').toString('utf8') === anchorHomeDomain,
		)
	)
		throw new GetChallengeValidationError(
			'Value of operation with name "web_auth_domain" must be the Server domain',
		);

	if (operations.length > 2) {
		const additionalOperations = operations.slice(2);
		const isValidManageData = additionalOperations.every(
			(operation) => operation.source === anchor.SIGNING_KEY,
		);
		if (!isValidManageData)
			throw new GetChallengeValidationError(
				'There is an invalid additional manage data in the operation',
			);
	}

	return { xdr: challengeXdr };
}

export function signXdr(challengeXdr: string, anclapCredentials: AnclapCredentials): object {
	const transaction = TransactionBuilder.fromXDR(
		challengeXdr,
		networkPassphrase[anclapCredentials.stellarNetwork],
	);
	transaction.sign(Keypair.fromSecret(anclapCredentials.secretKey));

	return { signedXdr: transaction.toXDR() };
}

function extractHomeDomain(url: string): string {
	const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/g;
	const matches = domainRegex.exec(url);
	if (matches && matches.length >= 2) {
		return matches[1];
	}
	return '';
}
