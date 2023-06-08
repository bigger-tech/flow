export default interface IWithdrawRequest {
	code: string;
	account: string;
	type: string;
	dest: string;
	amount: string;
}
