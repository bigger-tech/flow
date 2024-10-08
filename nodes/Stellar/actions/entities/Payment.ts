import { Horizon } from '@stellar/stellar-sdk';
import IPayment from '../../../../common/interfaces/stellar/IPayment';

export default class Payment implements IPayment {
	id: string;
	sourceAccount: string;
	transactionHash: string;
	assetType?: string;
	assetCode?: string;
	assetIssuer?: string;
	from: string;
	amount: string;
	createdAt: string;
	transaction: string;
	link: string;

	constructor(
		id: string,
		sourceAccount: string,
		transactionHash: string,
		assetType: string,
		from: string,
		amount: string,
		createdAt: string,
		transaction: Horizon.HorizonApi.ResponseLink,
		link: Horizon.HorizonApi.ResponseLink,
		assetCode?: string,
		assetIssuer?: string,
	) {
		this.id = id;
		this.sourceAccount = sourceAccount;
		this.transactionHash = transactionHash;
		if (assetType === NATIVE_ASSET_TYPE) {
			this.assetType = assetType;
		} else {
			this.assetCode = assetCode;
			this.assetIssuer = assetIssuer;
		}
		this.from = from;
		this.amount = amount;
		this.createdAt = createdAt;
		this.transaction = transaction.href;
		this.link = link.href;
	}
}

const NATIVE_ASSET_TYPE = 'native';
