import axios from 'axios';
import Payment from '../../../entities/Payment';
import { Server } from 'soroban-client';
import NoPaymentFoundError from '../../../../../../common/errors/stellar/NoPaymentFoundError';
import { IPaymentRecord } from '../../../../../../common/interfaces/stellar/IPaymentRecord';
import IAsset from '../../../../../../common/interfaces/stellar/IAsset';

enum FiltersTypeEnum {
	LIMIT = 'limit',
	ORDER = 'order',
}

export async function getPayments(
	server: Server,
	destinationAccount: string,
	limit: number,
	order: orderType,
) {
	// const firstPayments: Payment[] = [];
	const url = `${server.serverURL}accounts/`;

	const queryParams = new URLSearchParams();
	if (limit) queryParams.append(FiltersTypeEnum.LIMIT, limit.toString());
	if (order) queryParams.append(FiltersTypeEnum.ORDER, order);

	const queryString = `${queryParams.toString()}`;

	const payments: Payment[] = [];
	try {
		const {
			data: {
				_embedded: { records: records },
			},
		} = await axios.get(`${url}${destinationAccount}/payments?${queryString}`);

		records.forEach((paymentRecord: IPaymentRecord) => {
			payments.push(paymentMapper(paymentRecord));
		});

		return payments;
	} catch {
		throw new NoPaymentFoundError('No payment found for the given account');
	}
}

function paymentMapper(paymentRecord: IPaymentRecord) {
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

export function filterPaymentFromAccount(fromAccount: string, paymentList: Payment[]) {
	const firstPaymentFromAccount = paymentList.find(
		(payment) => payment.sourceAccount === fromAccount,
	);

	if (!firstPaymentFromAccount) {
		throw new NoPaymentFoundError('No payment found for the given account');
	}
	return firstPaymentFromAccount;
}

export function filterPaymentFromAsset(asset: IAsset['values'], paymentList: Payment[]) {
	let firstPaymentFromAsset: Payment | undefined;

	if (asset.isNative) {
		firstPaymentFromAsset = paymentList.find((payment) => payment.assetType === 'native');
	} else {
		firstPaymentFromAsset = paymentList.find(
			(payment) => payment.assetCode === asset.code && payment.assetIssuer === asset.issuer,
		);
	}
	if (!firstPaymentFromAsset) {
		throw new NoPaymentFoundError();
	}
	return firstPaymentFromAsset;
}

type orderType = 'asc' | 'desc';
