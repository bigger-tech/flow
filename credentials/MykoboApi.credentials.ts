import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class MykoboApi implements ICredentialType {
	name = 'mykoboApi';
	displayName = 'Mykobo API';
	description = 'Account credentials for Mykobo API';
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
			required: true,
			name: 'secretKey',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
		},
	];
}
