import { INodeProperties } from 'n8n-workflow';

export const transferServerDescription: INodeProperties[] = [
	{
		displayName: 'Show Optional Values',
		name: 'showOptionalValues',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['info'],
				operation: ['transferServer'],
			},
		},
		default: false,
	},
	{
		displayName: 'Language',
		name: 'lang',
		type: 'string',
		required: false,
		displayOptions: {
			show: {
                showOptionalValues: [true],
				resource: ['info'],
				operation: ['transferServer'],
			},
		},
		default: '',
		placeholder: '',
        description:"Defaults to en if not specified or if the specified language is not supported. Language code specified using RFC 4646. error fields and other human readable messages in the response should be in this language."
	}
]