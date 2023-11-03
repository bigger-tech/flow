import type { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

export type SorobanResources = {
	accountMerge: 'accountMerge';
	claimableBalance: 'createClaimableBalance' | 'claimClaimableBalance';
	settings: 'bumpSequence' | 'manageData' | 'setOptions';
	newAccount: 'createAccount';
	server: 'findLiquidityPool' | 'findPayments';
	offers: 'manageSellOffer' | 'manageBuyOffer' | 'createPassiveSellOffer';
	transaction: 'build' | 'sign' | 'prepareTransaction';
	payments: 'getPayment' | 'makePayment' | 'pathPaymentStrictSend' | 'pathPaymentStrictReceive';
	fundAccount: 'fundAccount';
	liquidityPool: 'liquidityPoolDeposit' | 'liquidityPoolWithdraw';
	sponsorship: 'beginSponsoring' | 'endSponsoring' | 'revokeSponsorship';
	clawback: 'clawback' | 'clawbackClaimableBalance';
	trust: 'changeTrust' | 'setTrustline';
	swapAssets: 'swap';
	contract: 'deployContract';
};

export type Soroban = AllEntities<SorobanResources>;

type SorobanAccountMerge = Entity<SorobanResources, 'accountMerge'>;
type SorobanClaimableBalance = Entity<SorobanResources, 'claimableBalance'>;
type SorobanSettings = Entity<SorobanResources, 'settings'>;
type SorobanNewAccount = Entity<SorobanResources, 'newAccount'>;
type SorobanOffers = Entity<SorobanResources, 'offers'>;
type SorobanTransaction = Entity<SorobanResources, 'transaction'>;
type SorobanPayments = Entity<SorobanResources, 'payments'>;
type SorobanServer = Entity<SorobanResources, 'server'>;
type SorobanFundAccount = Entity<SorobanResources, 'fundAccount'>;
type SorobanLiquidityPool = Entity<SorobanResources, 'liquidityPool'>;
type SorobanSponsorship = Entity<SorobanResources, 'sponsorship'>;
type SorobanClawback = Entity<SorobanResources, 'clawback'>;
type SorobanTrust = Entity<SorobanResources, 'trust'>;
type SorobanSwapAssets = Entity<SorobanResources, 'swapAssets'>;
type SorobanContracts = Entity<SorobanResources, 'contract'>;

export type AccountMergeProperties = PropertiesOf<SorobanAccountMerge>;
export type ClaimableBalanceProperties = PropertiesOf<SorobanClaimableBalance>;
export type SettingsProperties = PropertiesOf<SorobanSettings>;
export type NewAccountProperties = PropertiesOf<SorobanNewAccount>;
export type OffersProperties = PropertiesOf<SorobanOffers>;
export type TransactionProperties = PropertiesOf<SorobanTransaction>;
export type PaymentsProperties = PropertiesOf<SorobanPayments>;
export type ServerProperties = PropertiesOf<SorobanServer>;
export type FundAccountProperties = PropertiesOf<SorobanFundAccount>;
export type LiquidityPoolProperties = PropertiesOf<SorobanLiquidityPool>;
export type SponsorshipProperties = PropertiesOf<SorobanSponsorship>;
export type ClawbackProperties = PropertiesOf<SorobanClawback>;
export type TrustProperties = PropertiesOf<SorobanTrust>;
export type SwapAssetsProperties = PropertiesOf<SorobanSwapAssets>;
export type ContractsProperties = PropertiesOf<SorobanContracts>;
