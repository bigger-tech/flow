import { IExecuteFunctions } from 'n8n-workflow';
import { BASE_FEE, Horizon, Memo, TransactionBuilder, xdr } from '@stellar/stellar-sdk';
import { setNetwork } from '../../../transport';

export async function build(this: IExecuteFunctions) {
	try {
		const stellarNetwork = await setNetwork.call(this);
		const server = new Horizon.Server(stellarNetwork.url as string);
		const sourceAccount = this.getNodeParameter('publicKey', 0) as string;
		const fee = this.getNodeParameter('fee', 0) as string;
		const timeout = this.getNodeParameter('timeout', 0) as number;
		const items = this.getInputData();
		const memo = this.getNodeParameter('memo', 0) as boolean;

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

		const transactionXdr = transaction.build().toXDR();

		return { transaction: transactionXdr };
	} catch (error) {
		throw new Error(error);
	}
}
