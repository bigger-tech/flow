export default interface IOperations {
	operations: { [key: string]: { execute: () => Promise<{}> | {} } };
}
