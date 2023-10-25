import { SorobanResources } from './entities/SorobanNode';
import { build, sign } from './transaction';

interface IOperations {
	operations: { [key: string]: { execute: () => Promise<{}> | {} } };
}

const resources: { [key in keyof SorobanResources]: IOperations } = {
	transaction: {
		operations: { build: { execute: build.execute }, sign: { execute: sign.execute } },
	},
};

export default resources;
