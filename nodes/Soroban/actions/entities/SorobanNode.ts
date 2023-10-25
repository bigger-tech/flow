import type { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

export type SorobanResources = {
	newAccount: 'createAccount';
	transaction: 'build' | 'sign';
	payments: 'getPayment' | 'makePayment' | 'pathPaymentStrictSend' | 'pathPaymentStrictReceive';
};

export type Soroban = AllEntities<SorobanResources>;

type SorobanNewAccount = Entity<SorobanResources, 'newAccount'>;
type SorobanTransaction = Entity<SorobanResources, 'transaction'>;
type SorobanPayments = Entity<SorobanResources, 'payments'>;

export type NewAccountProperties = PropertiesOf<SorobanNewAccount>;
export type TransactionProperties = PropertiesOf<SorobanTransaction>;
export type PaymentsProperties = PropertiesOf<SorobanPayments>;
