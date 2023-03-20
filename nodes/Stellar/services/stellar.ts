import { IHttpRequestOptions } from 'n8n-workflow';
import StellarSdk, { Server, StrKey } from 'stellar-sdk';
import InvalidPublicKeyError from './error/InvalidPublicKeyError';
import StellarNetwork from './StellarNetwork';

const FRIENDBOT_URL = 'https://friendbot.stellar.org/?addr=';

let stellarNetwork: StellarNetwork;
let stellarServer: Server;

export function setNetwork(network: string) {
	stellarNetwork = new StellarNetwork(network);
	stellarServer = new Server(stellarNetwork.url);
}

export function createAccountKeypair() {
	const pair = StellarSdk.Keypair.random();
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
	const server = new StellarSdk.Server(stellarServer);
	const payments = await server.payments().forAccount(publicKey).call();
	const lastPayment = payments.records[payments.records.length - 1];

	return lastPayment;
}
