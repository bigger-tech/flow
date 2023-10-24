import { SorobanResources } from './entities/ISorobanNode';

interface IOperations {
	operations: { [key: string]: { execute: () => Promise<{}> | {} } };
}

const resources: { [key in keyof SorobanResources]: IOperations } = {
	newAccount: {
		operations: {},
	},
};

export default resources;
