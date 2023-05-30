import { transactions } from './info';
import { get, send } from './token';
import { deposit, withdraw } from './transactions';

interface IOperations {
	operations: { [key: string]: { execute: () => Promise<{}> | {} } };
}

const resources: { [key: string]: IOperations } = {
	info: {
		operations: {
			transactions: { execute: transactions },
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

export default resources;
