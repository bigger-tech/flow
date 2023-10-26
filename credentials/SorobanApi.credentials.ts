import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class SorobanApi implements ICredentialType {
	name = 'sorobanNetworkApi';
	displayName = 'Soroban Network API';
	description = "You're operating in this network";
	properties: INodeProperties[] = [
		{
			displayName: 'Soroban Network',
			name: 'network',
			type: 'options',
			default: '',
			options: [
				{ name: 'Soroban RPC', value: 'sorobanRpc' },
				{ name: 'Horizon RPC ', value: 'horizonRpc' },
				{ name: 'Custom', value: 'custom' },
			],
		},
		{
			displayName: 'Soroban RPC URL',
			name: 'networkUrl',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					network: ['custom'],
				},
			},
			default: '',
			placeholder: 'https://rpc-futurenet.stellar.org',
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
