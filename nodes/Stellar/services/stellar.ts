import { IHttpRequestOptions } from 'n8n-workflow';
import {
	Asset,
	StrKey,
	Keypair,
	Server,
	Operation,
	TransactionBuilder,
	BASE_FEE,
	Networks,
} from 'stellar-sdk';

import InvalidPublicKeyError from './error/InvalidPublicKeyError';

const FRIENDBOT_URL = 'https://friendbot.stellar.org/?addr=';
const stellarServer = 'https://horizon-testnet.stellar.org';

export function createAccountKeypair() {
	const pair = Keypair.random();
	const newKeypair = {
		publicKey: pair.publicKey(),
		secretKey: pair.secret(),
	};
	return newKeypair;
}

export function fundAccount(publicKey: string): IHttpRequestOptions {
	if (StrKey.isValidEd25519PublicKey(publicKey)) {
		const fundAccountRequestOptions: IHttpRequestOptions = {
			url: `${FRIENDBOT_URL}${publicKey}`,
			method: 'GET',
		};
		return fundAccountRequestOptions;
	} else {
		throw new InvalidPublicKeyError('Invalid public key');
	}
}

export async function getLastPayment(publicKey: string) {
	const server = new Server(stellarServer);
	const payments = await server.payments().forAccount(publicKey).call();
	const lastPayment = payments.records[payments.records.length - 1];

	return lastPayment;
}

export async function swapAssets(
	sourceAsset: Asset,
	destinationAsset: Asset,
	amount: string,
	publicKey: string,
	slippageAmount: string,
) {
	const server = new Server(stellarServer);
	const offers = await findOffers(server, sourceAsset, destinationAsset, amount);

	if (!slippageAmount) {
		return 'Please, select a slippage tolerance';
	}

	if (offers.records) {
		const bestOffer = offers.records[0];

		const paymentOperation = Operation.pathPaymentStrictSend({
			destination: publicKey,
			sendAsset: sourceAsset,
			sendAmount: amount,
			destAsset: destinationAsset,
			destMin: getMinDestinationAmount(bestOffer.destination_amount, slippageAmount),
		});

		const account = await server.loadAccount(publicKey);
		const transaction = new TransactionBuilder(account, {
			fee: BASE_FEE,
			networkPassphrase: Networks.TESTNET,
		});

		transaction.setTimeout(30);
		transaction.addOperation(paymentOperation);

		return transaction.build().toXDR();
	} else {
		throw new Error();
	}
}

function getMinDestinationAmount(offer: string, percentage: string) {
	const parsedOffer = Number(offer);
	const parsedPercentage = Number(percentage);

	const result = parsedOffer - parsedOffer * (parsedPercentage / 100);

	return `${result}`;
}

async function findOffers(
	server: Server,
	sourceAsset: Asset,
	destinationAsset: Asset,
	amount: string,
) {
	const assets = [destinationAsset];

	return await server.strictSendPaths(sourceAsset, amount, assets).call();
}
