import type { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

export type SorobanResources = {
	newAccount: 'createAccount';
	transaction: 'build' | 'sign';
};

export type Soroban = AllEntities<SorobanResources>;

type SorobanNewAccount = Entity<SorobanResources, 'newAccount'>;
type SorobanTransaction = Entity<SorobanResources, 'transaction'>;

export type NewAccountProperties = PropertiesOf<SorobanNewAccount>;
export type TransactionProperties = PropertiesOf<SorobanTransaction>;
