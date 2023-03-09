import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class StellarApi implements ICredentialType {
	name = 'stellarCredentialApi';
	displayName = 'Stellar Credential API';
	properties: INodeProperties[] = [
		{
			displayName: 'User Name',
			name: 'username',
			type: 'string',
			default: '',
		},
	];
}
