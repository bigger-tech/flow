import { INodeProperties } from 'n8n-workflow';

export const supportedCurrenciesDescription: INodeProperties[] = [
	{
		displayName: 'Language',
		name: 'lang',
		type: 'string',

		displayOptions: {
			show: {
				resource: ['info'],
				operation: ['directPayment'],
			},
		},
		default: '',
		placeholder: 'en',
		description:
			'Defaults to EN if not specified or if the specified language is not supported. Language code specified using RFC 4646. error fields and other human readable messages in the response should be in this language.',
	},
];
