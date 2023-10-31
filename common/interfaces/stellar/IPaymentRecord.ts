import { IResponseLink } from './IResponseLink';

export interface IPaymentRecord {
	id: string;
	source_account: string;
	transaction_hash: string;
	asset_type: string;
	asset_code?: string;
	asset_issuer?: string;
	from: string;
	amount: string;
	created_at: string;
	_links: {
		transaction: IResponseLink;
		self: IResponseLink;
	};
}
