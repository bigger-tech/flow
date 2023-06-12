import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class AnclapApi implements ICredentialType {
	name = 'anclapApi';
	displayName = 'Anclap API';
	description = 'Youre using this account';
	properties: INodeProperties[] = [
		{
			displayName: 'Stellar Network',
			name: 'stellarNetwork',
			type: 'options',
			required: true,
			options: [
				{
					name: 'Testnet',
					value: 'testnet',
				},
				{
					name: 'Public',
					value: 'public',
				},
			],
			default: 'testnet',
		},
		{
			displayName: 'Public Key',
			required: true,
			name: 'publicKey',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Secret Key',
			name: 'networkUrl',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
}
