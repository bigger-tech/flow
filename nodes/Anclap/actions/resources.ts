import { transactions, transaction, fee } from './info';
import { get, send } from './token';
import { deposit, withdraw } from './transactions';

interface IOperations {
	operations: { [key: string]: { execute: () => Promise<{}> | {} } };
}

const resources: { [key in AnclapResources]: IOperations } = {
	info: {
		operations: {
			transactions: { execute: transactions },
			transaction: { execute: transaction },
			fee: {execute: fee},
		},
	},
	token: {
		operations: {
			get: { execute: get },
			send: { execute: send },
		},
	},
	transactions: {
		operations: {
			deposit: { execute: deposit },
			withdraw: { execute: withdraw },
		},
	},
};

export type AnclapResources = 'info' | 'token' | 'transactions';

export default resources;
