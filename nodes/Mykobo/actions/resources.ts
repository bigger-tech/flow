import {
	transactions,
	transaction,
	fee,
	transferServer,
	directPayment,
	directPaymentTransaction,
} from './info';
import { get, send, validate, sign } from './token';
import {
	deposit,
	withdraw,
	depositInteractive,
	withdrawInteractive,
	payment,
	paymentCallback,
} from './transactions';
import { status, callback, deleteKYCInformation } from './kyc';
import { memoToHex } from './utils';

interface IOperations {
	operations: { [key: string]: { execute: () => Promise<{}> | {} } };
}

const resources: { [key in MykoboResources]: IOperations } = {
	info: {
		operations: {
			transactions: { execute: transactions },
			transaction: { execute: transaction },
			fee: { execute: fee },
			transferServer: { execute: transferServer },
			directPayment: { execute: directPayment },
			directPaymentTransaction: { execute: directPaymentTransaction },
		},
	},
	token: {
		operations: {
			get: { execute: get },
			send: { execute: send },
			validate: { execute: validate },
			sign: { execute: sign },
		},
	},
	transactions: {
		operations: {
			deposit: { execute: deposit },
			withdraw: { execute: withdraw },
			depositInteractive: { execute: depositInteractive },
			withdrawInteractive: { execute: withdrawInteractive },
			payment: { execute: payment },
			paymentCallback: { execute: paymentCallback },
		},
	},
	kyc: {
		operations: {
			status: { execute: status },
			callback: { execute: callback },
			deleteKYCInformation: { execute: deleteKYCInformation },
		},
	},
	utils: {
		operations: {
			memoToHex: { execute: memoToHex },
		},
	},
};

export type MykoboResources = 'info' | 'token' | 'transactions' | 'kyc' | 'utils';

export default resources;
