import { Asset, BASE_FEE, Operation, Server, TransactionBuilder } from 'stellar-sdk';

export async function getSwapAssetsTransaction(
	server: Server,
	networkPassphrase: string,
	sourceAsset: Asset,
	destinationAsset: Asset,
	amount: string,
	publicKey: string,
	slippageAmount: string,
) {
	const offers = await findOffers(server, sourceAsset, destinationAsset, amount);

	if (!slippageAmount) {
		return 'Please, select a slippage tolerance';
	}

	if (offers.records) {
		const bestOffer = offers.records[0];
		const paymentOperation = Operation.pathPaymentStrictSend({
			destination: publicKey,
			sendAsset: sourceAsset,
			sendAmount: amount,
			destAsset: destinationAsset,
			destMin: getMinDestinationAmount(bestOffer.destination_amount, slippageAmount),
		});

		const account = await server.loadAccount(publicKey);
		const transaction = new TransactionBuilder(account, {
			fee: BASE_FEE,
			networkPassphrase,
		});

		transaction.setTimeout(30);
		transaction.addOperation(paymentOperation);

		return transaction.build().toXDR();
	} else {
		throw new Error();
	}
}

function getMinDestinationAmount(offer: string, percentage: string) {
	const parsedOffer = Number(offer);
	const parsedPercentage = Number(percentage);
	const result = parsedOffer - parsedOffer * (parsedPercentage / 100);

	return `${result}`;
}

async function findOffers(
	server: Server,
	sourceAsset: Asset,
	destinationAsset: Asset,
	amount: string,
) {
	const assets = [destinationAsset];

	return await server.strictSendPaths(sourceAsset, amount, assets).call();
}
