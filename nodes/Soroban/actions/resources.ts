import { SorobanResources } from './entities/ISorobanNode';
import { makePayment, pathPaymentStrictReceive, pathPaymentStrictSend } from './payments';

interface IOperations {
	operations: { [key: string]: { execute: () => Promise<{}> | {} } };
}

const resources: { [key in keyof SorobanResources]: IOperations } = {
	newAccount: {
		operations: {},
	},
	payments: {
		operations: {
			makePayment: { execute: makePayment.execute },
			pathPaymentStrictReceive: { execute: pathPaymentStrictReceive.execute },
			pathPaymentStrictSend: { execute: pathPaymentStrictSend.execute },
		},
	},
};

export default resources;
