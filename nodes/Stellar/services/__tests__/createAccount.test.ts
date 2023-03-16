import { StrKey } from 'stellar-sdk';
import { createAccountKeypair } from '../stellar';
import { expect, it, describe } from 'vitest';

describe('Should create a new key pair', () => {
	const newKeypair = createAccountKeypair();
	it('Should create a valid keypair', () => {
		expect(StrKey.isValidEd25519PublicKey(newKeypair.publicKey)).toBeTruthy();
		expect(StrKey.isValidEd25519SecretSeed(newKeypair.secretKey)).toBeTruthy();
	});
	it('Should create a different keypair in every call', () => {
		const secondKeypair = createAccountKeypair();
		expect(secondKeypair.publicKey).not.toEqual(newKeypair.publicKey);
		expect(secondKeypair.secretKey).not.toEqual(newKeypair.secretKey);
	});
});
