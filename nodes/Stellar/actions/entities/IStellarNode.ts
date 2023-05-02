import type { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

type StellarMap = {
	accountMerge: 'accountMerge';
	settings: 'bumpSequence' | 'manageData' | 'setOptions';
	claimableBalance: 'createClaimableBalance' | 'claimClaimableBalance';
	clawback: 'clawback' | 'clawbackClaimableBalance';
	fundAccount: 'fundAccount';
	liquidityPool: 'liquidityPoolDeposit' | 'liquidityPoolWithdraw';
	newAccount: 'createAccount';
	offers: 'manageSellOffer' | 'manageBuyOffer' | 'createPassiveSellOffer';
	payments: 'getPayment' | 'makePayment' | 'pathPaymentStrictSend' | 'pathPaymentStrictReceive';
	sponsorship: 'beginSponsoring' | 'endSponsoring' | 'revokeSponsorship';
	swapAssets: 'swap';
	transaction: 'build' | 'sign';
	trust: 'changeTrust' | 'setTrustline';
};

export type Stellar = AllEntities<StellarMap>;
