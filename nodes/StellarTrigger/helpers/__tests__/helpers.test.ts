/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { validateTx } from '../helpers';
import IAssetParam from '../../IAssetParam';

describe('Validate TX', () => {
	it('Should return true if TX has the same code', () => {
		const assets: IAssetParam = { values: [{ code: 'yUSDC', issuer: '1234' }] };
		const tx = { asset_code: 'yUSDC' };

		const isTxValid = validateTx(tx, assets);

		expect(isTxValid).toBe(true);
	});

	it('Should return true if TX has the same issuer', () => {
		const assets: IAssetParam = { values: [{ code: 'yUSDC', issuer: '1234' }] };
		const tx = { asset_issuer: '1234' };

		const isTxValid = validateTx(tx, assets);

		expect(isTxValid).toBe(true);
	});

	it('Should return true if TX has the same type', () => {
		const assets: IAssetParam = { values: [{ code: 'native', issuer: '' }] };
		const tx = { asset_type: 'native' };

		const isTxValid = validateTx(tx, assets);

		expect(isTxValid).toBe(true);
	});

	it('Should return false if TX has not a valid code', () => {
		const assets: IAssetParam = { values: [{ code: 'yUSDC', issuer: '1234' }] };
		const tx = { asset_code: 'ARS' };

		const isTxValid = validateTx(tx, assets);

		expect(isTxValid).toBe(false);
	});

	it('Should return true if TX has one valid code', () => {
		const assets: IAssetParam = {
			values: [
				{ code: 'yUSDC', issuer: '1234' },
				{ code: 'ARS', issuer: '1234' },
			],
		};

		const tx = { asset_code: 'ARS' };

		const isTxValid = validateTx(tx, assets);

		expect(isTxValid).toBe(true);
	});
});
