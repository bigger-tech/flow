import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class AnclapApi implements ICredentialType {
	name = 'anclapCredentialsApi';
	displayName = 'Anclap Credentials API';
	description = 'Youre using this account';
	properties: INodeProperties[] = [
		{
			displayName: 'Protocol',
			name: 'protocol',
			type: 'options',
			required: true,
			options: [
				{
					name: 'SEP24',
					value: 'sep24',
				},
				{
					name: 'SEP6',
					value: 'sep6',
				},
			],
			default: 'sep24',
		},
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
