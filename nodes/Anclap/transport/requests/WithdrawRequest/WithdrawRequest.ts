import IWithdrawRequest from './IWithdrawRequest';

export default class WithdrawRequest implements IWithdrawRequest {
	public code: string;
	public type: string;
	public dest: string;
	public amount: string;

	constructor(request: IWithdrawRequest) {
		this.code = request.code;
		this.type = request.type;
		this.dest = request.dest;
		this.amount = request.amount;
	}
}
