import type { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

export type SorobanResources = {
	transaction: 'build' | 'sign';
};

export type Soroban = AllEntities<SorobanResources>;

type SorobanTransaction = Entity<SorobanResources, 'transaction'>;

export type TransactionProperties = PropertiesOf<SorobanTransaction>;
