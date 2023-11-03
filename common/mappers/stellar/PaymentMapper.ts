import Payment from '../../../nodes/Soroban/actions/entities/Payment';
import { IPaymentRecord } from '../../interfaces/stellar/IPaymentRecord';

export default class PaymentMapper {
	static paymentMapper(paymentRecord: IPaymentRecord) {
		const {
			id,
			source_account,
			transaction_hash,
			asset_type,
			asset_code,
			asset_issuer,
			from,
			amount,
			created_at,
			_links,
		} = paymentRecord;
		return new Payment(
			id,
			source_account,
			transaction_hash,
			asset_type,
			from,
			amount,
			created_at,
			_links.transaction,
			_links.self,
			asset_code,
			asset_issuer,
		);
	}
}
