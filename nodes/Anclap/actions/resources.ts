import {
	transactions,
	transaction,
	fee,
	transferServer,
	quoteServer,
	prices,
	price,
	firmQuote,
	quote,
} from './info';
import { get, send, validate, sign } from './token';
import {
	deposit,
	withdraw,
	depositInteractive,
	withdrawInteractive,
	depositExchange,
	withdrawExchange,
} from './transactions';

interface IOperations {
	operations: { [key: string]: { execute: () => Promise<{}> | {} } };
}

const resources: { [key in AnclapResources]: IOperations } = {
	info: {
		operations: {
			transactions: { execute: transactions },
			transaction: { execute: transaction },
			fee: { execute: fee },
			transferServer: { execute: transferServer },
			quoteServer: { execute: quoteServer },
			prices: { execute: prices },
			price: { execute: price },
			firmQuote: { execute: firmQuote },
			quote: { execute: quote },
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
			depositExchange: { execute: depositExchange },
			withdrawExchange: { execute: withdrawExchange },
		},
	},
};

export type AnclapResources = 'info' | 'token' | 'transactions';

export default resources;
