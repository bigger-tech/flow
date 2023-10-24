import type { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

export type SorobanResources = {
	newAccount: 'createAccount';
};

export type Soroban = AllEntities<SorobanResources>;

type SorobanNewAccount = Entity<SorobanResources, 'newAccount'>;

export type NewAccountProperties = PropertiesOf<SorobanNewAccount>;
