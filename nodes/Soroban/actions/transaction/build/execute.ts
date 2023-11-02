import { IExecuteFunctions } from 'n8n-workflow';
import { BASE_FEE, Server, Memo, TransactionBuilder, xdr, Transaction } from 'soroban-client';
import { SorobanNetwork } from '../../../transport';

export async function build(this: IExecuteFunctions) {
	try {
		const stellarNetwork = await SorobanNetwork.setNetwork.call(this);
		const server = new Server(stellarNetwork.url as string);
		const sourceAccount = this.getNodeParameter('publicKey', 0) as string;
		const fee = this.getNodeParameter('fee', 0) as string;
		const timeout = this.getNodeParameter('timeout', 0) as number;
		const items = this.getInputData();
		const memo = this.getNodeParameter('memo', 0) as boolean;

		const operations = items.map((item) => {
			const {
				json: { operation },
			} = item;

			if (operation) {
				return operation as string;
			}

			return;
		});

		const transaction = new TransactionBuilder(await server.getAccount(sourceAccount), {
			fee: fee || BASE_FEE,
			networkPassphrase: stellarNetwork.passphrase,
		}).setTimeout(timeout | 30);

		if (memo) {
			const memoOptions = ['hash', 'id', 'return', 'text'];

			memoOptions.forEach((option) => {
				const value = this.getNodeParameter(option, 0) as string;
				if (value) {
					switch (option) {
						case 'hash':
							transaction.addMemo(Memo.hash(value));
							break;
						case 'id':
							transaction.addMemo(Memo.id(value));
							break;
						case 'return':
							transaction.addMemo(Memo.return(value));
							break;
						case 'text':
							transaction.addMemo(Memo.text(value));
							break;
					}
				}
			});
		}

		for (const operationXdr of operations) {
			if (operationXdr) {
				const operation = xdr.Operation.fromXDR(operationXdr, 'base64');
				transaction.addOperation(operation);
			}
		}

		const transactionXdr = transaction.build();
		const tx = (await server.prepareTransaction(transactionXdr)) as Transaction;

		return { transaction: tx.toXDR() };
	} catch (error) {
		throw new Error(error);
	}
}
