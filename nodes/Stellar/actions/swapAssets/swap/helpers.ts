import { Asset, Operation, Server } from 'stellar-sdk';

export async function getSwapAssetsOperation(
	server: Server,
	sourceAsset: Asset,
	destinationAsset: Asset,
	amount: string,
	publicKey: string,
	slippageAmount: string,
) {
	const { records: offers } = await findOffers(server, sourceAsset, destinationAsset, amount);

	if (!slippageAmount) {
		return 'Please, select a slippage tolerance';
	}

	if (offers) {
		const { destination_amount: destinationAmount } = offers[0];
		const paymentOperation = Operation.pathPaymentStrictSend({
			destination: publicKey,
			sendAsset: sourceAsset,
			sendAmount: amount,
			destAsset: destinationAsset,
			destMin: getMinDestinationAmount(destinationAmount, slippageAmount),
		});

		return paymentOperation.toXDR('base64');
	} else {
		throw new Error();
	}
}

function getMinDestinationAmount(offer: string, percentage: string) {
	const parsedOffer = Number(offer);
	const parsedPercentage = Number(percentage);

	return (parsedOffer - parsedOffer * (parsedPercentage / 100)).toString();
}

async function findOffers(
	server: Server,
	sourceAsset: Asset,
	destinationAsset: Asset,
	sourceAmount: string,
) {
	const assets = [destinationAsset];

	return await server.strictSendPaths(sourceAsset, sourceAmount, assets).call();
}
