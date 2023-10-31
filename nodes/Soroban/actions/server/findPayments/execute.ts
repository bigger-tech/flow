import { IExecuteFunctions } from 'n8n-workflow';
import { Server } from 'soroban-client';
import { SorobanNetwork } from '../../../transport';
import { getPayments, filterPaymentFromAccount, filterPaymentFromAsset } from './helpers/helpers';
import IAdditionalPaymentFilter from '../../../../../common/interfaces/stellar/IAdditionalPaymentFilter';

export async function findPayments(this: IExecuteFunctions) {
	try {
		const publicKey = this.getNodeParameter('publicKey', 1) as string;
		const isOrderDescending = this.getNodeParameter('isOrderDescending', 0) as boolean;
		const limit = this.getNodeParameter('searchLimit', 0) as number;
		const { values: additionalFilters } = this.getNodeParameter(
			'additionalFilters',
			0,
		) as IAdditionalPaymentFilter;

		const order = isOrderDescending ? 'desc' : 'asc';

		const sorobanNetwork = await SorobanNetwork.setNetwork.call(this);
		const server = new Server(sorobanNetwork.url as string);
		const payments = await getPayments(server, publicKey, limit, order);

		if (additionalFilters) {
			switch (additionalFilters.filter) {
				case 'firstPaymentFromAccount':
					return { payment: filterPaymentFromAccount(additionalFilters.accountFrom, payments) };
				case 'firstPaymentInAsset':
					return {
						payment: filterPaymentFromAsset(additionalFilters.assetInPayment.values, payments),
					};
			}
		}
		return { payments };
	} catch (error) {
		throw new Error(error.message);
	}
}
