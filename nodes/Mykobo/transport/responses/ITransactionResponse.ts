export default interface ITransactionResponse {
	id: string;
	status: string;
	status_eta?: number;
	status_message?: string;
	amount_in?: string;
	amount_in_asset?: string;
	amount_out?: string;
	amount_out_asset?: string;
	amount_fee?: string;
	quote_id?: string;
	stellar_account_id?: string;
	stellar_memo_type?: string;
	stellar_memo?: string;
	started_at?: string;
	updated_at?: string;
	completed_at?: string;
	stellar_transaction_id?: string;
	external_transaction_id?: string;
	refunds?: Object;
	required_info_message?: string;
	required_info_updates?: Object;
}
