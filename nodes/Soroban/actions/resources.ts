import { SorobanResources } from './entities/SorobanNode';
import { makePayment, pathPaymentStrictReceive, pathPaymentStrictSend } from './payments';
import { createAccount } from './newAccount';
import { fundAccount } from './fundAccount';
import { build, sign } from './transaction';
import { beginSponsoring, endSponsoring, revokeSponsorship } from './sponsorship';

interface IOperations {
	operations: { [key: string]: { execute: () => Promise<{}> | {} } };
}

const resources: { [key in keyof SorobanResources]: IOperations } = {
	newAccount: {
		operations: {
			createAccount: { execute: createAccount.execute },
		},
	},
	fundAccount: {
		operations: {
			fundAccount: { execute: fundAccount.execute },
		},
	},
	transaction: {
		operations: { build: { execute: build.execute }, sign: { execute: sign.execute } },
	},
	payments: {
		operations: {
			makePayment: { execute: makePayment.execute },
			pathPaymentStrictReceive: { execute: pathPaymentStrictReceive.execute },
			pathPaymentStrictSend: { execute: pathPaymentStrictSend.execute },
		},
	},
	sponsorship: {
		operations: {
			beginSponsoring: { execute: beginSponsoring.execute },
			endSponsoring: { execute: endSponsoring.execute },
			revokeSponsorship: { execute: revokeSponsorship.execute },
		},
	},
};

export default resources;
