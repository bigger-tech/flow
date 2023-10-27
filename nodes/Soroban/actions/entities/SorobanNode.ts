import type { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

export type SorobanResources = {
	accountMerge: 'accountMerge';
	claimableBalance: 'createClaimableBalance' | 'claimClaimableBalance';
	newAccount: 'createAccount';
	offers: 'manageSellOffer' | 'manageBuyOffer' | 'createPassiveSellOffer';
	transaction: 'build' | 'sign';
	payments: 'getPayment' | 'makePayment' | 'pathPaymentStrictSend' | 'pathPaymentStrictReceive';
	fundAccount: 'fundAccount';
	liquidityPool: 'liquidityPoolDeposit' | 'liquidityPoolWithdraw';
	sponsorship: 'beginSponsoring' | 'endSponsoring' | 'revokeSponsorship';
	clawback: 'clawback' | 'clawbackClaimableBalance';
	trust: 'changeTrust' | 'setTrustline';
};

export type Soroban = AllEntities<SorobanResources>;

type SorobanAccountMerge = Entity<SorobanResources, 'accountMerge'>;
type SorobanClaimableBalance = Entity<SorobanResources, 'claimableBalance'>;
type SorobanNewAccount = Entity<SorobanResources, 'newAccount'>;
type SorobanOffers = Entity<SorobanResources, 'offers'>;
type SorobanTransaction = Entity<SorobanResources, 'transaction'>;
type SorobanPayments = Entity<SorobanResources, 'payments'>;
type SorobanFundAccount = Entity<SorobanResources, 'fundAccount'>;
type SorobanLiquidityPool = Entity<SorobanResources, 'liquidityPool'>;
type SorobanSponsorship = Entity<SorobanResources, 'sponsorship'>;
type SorobanClawback = Entity<SorobanResources, 'clawback'>;
type SorobanTrust = Entity<SorobanResources, 'trust'>;

export type AccountMergeProperties = PropertiesOf<SorobanAccountMerge>;
export type ClaimableBalanceProperties = PropertiesOf<SorobanClaimableBalance>;
export type NewAccountProperties = PropertiesOf<SorobanNewAccount>;
export type OffersProperties = PropertiesOf<SorobanOffers>;
export type TransactionProperties = PropertiesOf<SorobanTransaction>;
export type PaymentsProperties = PropertiesOf<SorobanPayments>;
export type FundAccountProperties = PropertiesOf<SorobanFundAccount>;
export type LiquidityPoolProperties = PropertiesOf<SorobanLiquidityPool>;
export type SponsorshipProperties = PropertiesOf<SorobanSponsorship>;
export type ClawbackProperties = PropertiesOf<SorobanClawback>;
export type TrustProperties = PropertiesOf<SorobanTrust>;
