import { IHttpRequestOptions } from 'n8n-workflow';
import StellarSdk, { StrKey } from 'stellar-sdk';
import InvalidPublicKeyError from './error/InvalidPublicKeyError';

const FRIENDBOT_URL = 'https://friendbot.stellar.org/?addr=';

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
}
