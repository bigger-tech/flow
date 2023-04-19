import { IExecuteFunctions } from 'n8n-workflow';
import { BASE_FEE, Server, TransactionBuilder, xdr } from 'stellar-sdk';
import { setNetwork } from '../../../transport';

export async function build(this: IExecuteFunctions) {
	try {
		const stellarNetwork = await setNetwork.call(this);
		const server = new Server(stellarNetwork.url as string);
		const sourceAccount = this.getNodeParameter('publicKey', 1) as string;
		const fee = this.getNodeParameter('fee', 1) as string;
		const timeout = this.getNodeParameter('timeout', 1) as number;
		const items = this.getInputData();

		const operations = items.map((item) => {
			const operation = item.json.operation as string;

			if (operation) {
				return operation;
			}

			return;
		});

		const transaction = new TransactionBuilder(await server.loadAccount(sourceAccount), {
			fee: fee || BASE_FEE,
			networkPassphrase: stellarNetwork.passphrase,
		}).setTimeout(timeout | 30);

		for (const operationXdr of operations) {
			if (operationXdr) {
				const operation = xdr.Operation.fromXDR(operationXdr, 'base64');
				transaction.addOperation(operation);
			}
		}

		const transactionXdr = transaction.build().toXDR();

		return { transaction: transactionXdr };
	} catch (error) {
		throw new Error(error);
	}
}
