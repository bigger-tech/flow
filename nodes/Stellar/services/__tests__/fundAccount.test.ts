import { describe, it, expect } from 'vitest';
import InvalidPublicKeyError from '../error/InvalidPublicKeyError';
import { fundAccount } from '../stellar';

describe('Should fund a testnet account through Friendbot', () => {
	it('Build a request to fund account', async () => {
		const publicKey = 'GDT5SRWNAHODE2WYAJBBOMKZ6EGVBA4CUWAHWDC3PWK6G75QQZNZQN7V';
		const fundAccountRequest = fundAccount(publicKey);
		expect(fundAccountRequest.method).toBe('GET');
		expect(fundAccountRequest.url).toBe(`https://friendbot.stellar.org/?addr=${publicKey}`);
	});
	it('Should throw an error if public key is invalid', () => {
		const invalidPublicKey = 'GDT5SRWNAHODE2WYAJBBOMKZ6EGVBA4CUWAHWDC3PWK6G75QQZNN';
		expect(() => {
			fundAccount(invalidPublicKey);
		}).toThrow(InvalidPublicKeyError);
		expect(() => {
			fundAccount(invalidPublicKey);
		}).toThrow('Invalid public key');
	});
});
