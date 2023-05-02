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

type StellarAccountMerge = Entity<StellarMap, 'accountMerge'>;
type StellarSettings = Entity<StellarMap, 'settings'>;
type StellarClaimableBalance = Entity<StellarMap, 'claimableBalance'>;
type StellarClawback = Entity<StellarMap, 'clawback'>;
type StellarFundAccount = Entity<StellarMap, 'fundAccount'>;
type StellarLiquidityPool = Entity<StellarMap, 'liquidityPool'>;
type StellarNewAccount = Entity<StellarMap, 'newAccount'>;
type StellarOffers = Entity<StellarMap, 'offers'>;
type StellarPayments = Entity<StellarMap, 'payments'>;
type StellarSponsorship = Entity<StellarMap, 'sponsorship'>;
type StellarSwapAssets = Entity<StellarMap, 'swapAssets'>;
type StellarTransaction = Entity<StellarMap, 'transaction'>;
type StellarTrust = Entity<StellarMap, 'trust'>;

export type AccountMergeProperties = PropertiesOf<StellarAccountMerge>;
export type SettingsProperties = PropertiesOf<StellarSettings>;
export type ClaimableBalanceProperties = PropertiesOf<StellarClaimableBalance>;
export type ClawbackProperties = PropertiesOf<StellarClawback>;
export type FundAccountProperties = PropertiesOf<StellarFundAccount>;
export type LiquidityPoolProperties = PropertiesOf<StellarLiquidityPool>;
export type NewAccountProperties = PropertiesOf<StellarNewAccount>;
export type OffersProperties = PropertiesOf<StellarOffers>;
export type PaymentsProperties = PropertiesOf<StellarPayments>;
export type SponsorshipProperties = PropertiesOf<StellarSponsorship>;
export type SwapAssetsProperties = PropertiesOf<StellarSwapAssets>;
export type TransactionProperties = PropertiesOf<StellarTransaction>;
export type TrustProperties = PropertiesOf<StellarTrust>;
