import { INodeProperties } from 'n8n-workflow';
import * as beginSponsoring from './beginSponsoring';
import * as endSponsoring from './endSponsoring';
export { beginSponsoring, endSponsoring };

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: 'beginSponsoring',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['sponsorship'],
			},
		},
		options: [
			{
				name: 'Begin Sponsoring Future Reserves',
				value: 'beginSponsoring',
				description:
					'Initiate a sponsorship. There must be a corresponding End Sponsoring Future Reserves operation in the same transaction.',
				action: 'Begin sponsorship future reserves',
			},
			{
				name: 'End Sponsoring Future Reserves',
				value: 'endSponsoring',
				description: 'End a sponsorship',
				action: 'End sponsorship future reserves',
			},
			{
				name: 'Revoke Sponsorship',
				value: 'Revoke sponsorship of a ledger entry.',
				description: 'Revoke sponsorship of a ledger entry',
				action: 'Revoke sponsorship',
			},
		],
	},
	...beginSponsoring.description,
	...endSponsoring.description,
];
