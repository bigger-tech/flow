import { transactions, transaction, fee, transferServer } from './info';
import { get, send, validate, sign } from './token';
import { deposit, withdraw, depositInteractive, withdrawInteractive } from './transactions';
import { status, deleteKYCInformation } from './kyc';
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
		},
	},
	kyc: {
		operations: {
			status: { execute: status },
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
