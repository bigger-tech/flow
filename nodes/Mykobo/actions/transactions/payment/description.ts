import { INodeProperties } from 'n8n-workflow';

export const paymentDescription: INodeProperties[] = [
	{
		displayName: 'Token',
		name: 'token',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['payment'],
			},
		},
		default: '',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['payment'],
			},
		},
		default: '',
		placeholder: '5.00',
		description:
			'The amount of the asset the user would like to withdraw. This field may be necessary for the anchor to determine what KYC information is necessary to collect.',
	},
	{
		displayName: 'Asset Code',
		name: 'assetCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['payment'],
			},
		},
		default: '',
		placeholder: 'EURC',
		description:
			"Code of the on-chain asset the user wants to withdraw. The value passed must match one of the codes listed in the /info response's withdraw object.",
	},
	{
		displayName: 'Show Optional Values',
		name: 'showOptionalValues',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['payment'],
			},
		},
		default: false,
	},
	{
		displayName: 'Asset Issuer',
		name: 'assetIssuer',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['payment'],
				showOptionalValues: [true],
			},
		},
		default: '',
		placeholder: 'GDRHDSTZ4PK6VI3WL224XBJFEB6CUXQESTQPXYIB3KGITRLL7XVE4NWV',
		description:
			'The issuer of the Stellar asset the Sending Anchor intends to send. If not specified, the asset sent must be issued by the Receiving Anchor.',
	},
	{
		displayName: 'Destination Asset',
		name: 'destinationAsset',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['payment'],
				showOptionalValues: [true],
			},
		},
		default: '',
		placeholder: 'iso4217:BRL',
		description:
			"The off-chain asset the Receiving Anchor will deliver to the Receiving Client. The value must match one of the asset values included in a SEP-38 GET /prices?sell_asset=stellar:&lt;asset_code&gt;:&lt;asset_issuer&gt; response using SEP-38 Asset Identification Format. If neither this field nor quote_id are set, it's assumed that Sending Anchor Asset Conversions was used.",
	},
	{
		displayName: 'Quote ID',
		name: 'quoteId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['payment'],
				showOptionalValues: [true],
			},
		},
		default: '',
		placeholder: '2bc5b322-5117-413f-869f-e7ca494cb1a4',
		description:
			'The ID returned from a SEP-38 POST /quote response. If this attribute is specified, the values for the fields defined above must match the values associated with the quote.',
	},
	{
		displayName: 'Sender ID',
		name: 'senderId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['payment'],
				showOptionalValues: [true],
			},
		},
		default: '',
		placeholder: 'd2bd1412-e2f6-4047-ad70-a1a2f133b25c',
		description:
			'The ID included in the SEP-12 PUT /customer response for the Sending Client. Required if the Receiving Anchor requires SEP-12 KYC on the Sending Client.',
	},
	{
		displayName: 'Receiver ID',
		name: 'receiverId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['payment'],
				showOptionalValues: [true],
			},
		},
		default: '',
		placeholder: '137938d4-43a7-4252-a452-842adcee474c',
		description:
			'The ID included in the SEP-12 PUT /customer response for the Receiving Client. Required if the Receiving Anchor requires SEP-12 KYC on the Receiving Client.',
	},
	{
		displayName: 'Language',
		name: 'lang',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['payment'],
				showOptionalValues: [true],
			},
		},
		default: '',
		placeholder: 'en',
		description:
			'Defaults to EN if not specified or if the specified language is not supported. Language code specified using RFC 4646. error fields and other human readable messages in the response should be in this language.',
	},
	{
		displayName: 'Refund Memo',
		name: 'refundMemo',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['payment'],
				showOptionalValues: [true],
			},
		},
		default: '',
		placeholder: '',
		description:
			'The memo the Receiving Anchor must use when sending refund payments back to the Sending Anchor. If not specified, the Receiving Anchor should use the same memo the Sending Anchor used to send the original payment.',
	},
	{
		displayName: 'Refund Memo Type',
		name: 'refundMemoType',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['payment'],
				showOptionalValues: [true],
			},
		},
		default: '',
		placeholder: '',
		description: 'The type of the refund memo can be ID, text, or hash',
	},
];
