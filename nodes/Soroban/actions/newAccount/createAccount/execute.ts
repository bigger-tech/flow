import StellarClient from '@stellar/stellar-sdk';
import type { IExecuteFunctions } from 'n8n-workflow';

export async function createAccount(this: IExecuteFunctions) {
	try {
		const keyPair = StellarClient.Keypair.random();
		return {
			publicKey: keyPair.publicKey(),
			secretKey: keyPair.secret(),
		};
	} catch (error) {
		throw new Error(error);
	}
}
