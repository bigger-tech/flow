import type { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

export type SorobanResources = {
	newAccount: 'createAccount';
	transaction: 'build' | 'sign';
	payments: 'getPayment' | 'makePayment' | 'pathPaymentStrictSend' | 'pathPaymentStrictReceive';
	fundAccount: 'fundAccount';
	sponsorship: 'beginSponsoring' | 'endSponsoring' | 'revokeSponsorship';
	trust: 'changeTrust' | 'setTrustline';
};

export type Soroban = AllEntities<SorobanResources>;

type SorobanNewAccount = Entity<SorobanResources, 'newAccount'>;
type SorobanTransaction = Entity<SorobanResources, 'transaction'>;
type SorobanPayments = Entity<SorobanResources, 'payments'>;
type SorobanFundAccount = Entity<SorobanResources, 'fundAccount'>;
type SorobanSponsorship = Entity<SorobanResources, 'sponsorship'>;
type SorobanTrust = Entity<SorobanResources, 'trust'>;

export type NewAccountProperties = PropertiesOf<SorobanNewAccount>;
export type TransactionProperties = PropertiesOf<SorobanTransaction>;
export type PaymentsProperties = PropertiesOf<SorobanPayments>;
export type FundAccountProperties = PropertiesOf<SorobanFundAccount>;
export type SponsorshipProperties = PropertiesOf<SorobanSponsorship>;
export type TrustProperties = PropertiesOf<SorobanTrust>;
