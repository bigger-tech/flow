import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class SorobanApi implements ICredentialType {
	name = 'sorobanNetworkApi';
	displayName = 'Soroban Network API';
	description = 'Youre operating in this network';
	properties: INodeProperties[] = [
		{
			displayName: 'Soroban Network',
			name: 'network',
			type: 'options',
			default: '',
			options: [
				{ name: 'Futurenet', value: 'futurenet' },
				{ name: 'Custom', value: 'custom' },
			],
		},
		{
			displayName: 'Futurenet URL',
			name: 'networkUrl',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					network: ['custom'],
				},
			},
			default: '',
			placeholder: 'https://horizon-futurenet.stellar.org',
		},
		{
			displayName: 'Network Passphrase',
			name: 'networkPassphrase',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					network: ['custom'],
				},
			},
			default: '',
			placeholder: 'Test SDF Future Network ; October 2022',
		},
	];
}
