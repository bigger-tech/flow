import type { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

export type SorobanResources = {
	claimableBalance: 'createClaimableBalance' | 'claimClaimableBalance';
	newAccount: 'createAccount';
	transaction: 'build' | 'sign';
	payments: 'getPayment' | 'makePayment' | 'pathPaymentStrictSend' | 'pathPaymentStrictReceive';
	fundAccount: 'fundAccount';
};

export type Soroban = AllEntities<SorobanResources>;

type SorobanClaimableBalance = Entity<SorobanResources, 'claimableBalance'>;
type SorobanNewAccount = Entity<SorobanResources, 'newAccount'>;
type SorobanTransaction = Entity<SorobanResources, 'transaction'>;
type SorobanPayments = Entity<SorobanResources, 'payments'>;
type SorobanFundAccount = Entity<SorobanResources, 'fundAccount'>;

export type ClaimableBalanceProperties = PropertiesOf<SorobanClaimableBalance>;
export type NewAccountProperties = PropertiesOf<SorobanNewAccount>;
export type TransactionProperties = PropertiesOf<SorobanTransaction>;
export type PaymentsProperties = PropertiesOf<SorobanPayments>;
export type FundAccountProperties = PropertiesOf<SorobanFundAccount>;
