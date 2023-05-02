import type { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

type StellarMap = {
	accountMerge: 'accountMerge';
	newAccount: 'createAccount';
	fundAccount: 'fundAccount';
	payments: 'getPayment' | 'makePayment' | 'pathPaymentStrictSend' | 'pathPaymentStrictReceive';
	offers: 'manageSellOffer' | 'manageBuyOffer' | 'createPassiveSellOffer';
	swapAssets: 'swap';
	transaction: 'build' | 'sign';
	claimableBalance: 'createClaimableBalance' | 'claimClaimableBalance';
	clawback: 'clawback' | 'clawbackClaimableBalance';
	settings: 'bumpSequence' | 'manageData' | 'setOptions';
	sponsorship: 'beginSponsoring' | 'endSponsoring' | 'revokeSponsorship';
	trust: 'changeTrust' | 'setTrustline';
	liquidityPool: 'liquidityPoolDeposit' | 'liquidityPoolWithdraw';
};

export type Stellar = AllEntities<StellarMap>;
