import { Asset, Operation, Server } from 'soroban-client';
import axios from 'axios';

export async function getSwapAssetsOperation(
	server: Server,
	sourceAsset: Asset,
	destinationAsset: Asset,
	amount: string,
	publicKey: string,
	slippageAmount: string,
) {
	if (!slippageAmount) {
		return 'Please, select a slippage tolerance';
	}

	const offers = await findOffers(server, sourceAsset, destinationAsset, amount);

	if (offers) {
		const bestOffer = offers[0];
		const paymentOperation = Operation.pathPaymentStrictSend({
			destination: publicKey,
			sendAsset: sourceAsset,
			sendAmount: amount,
			destAsset: destinationAsset,
			destMin: getMinDestinationAmount(bestOffer.destination_amount, slippageAmount),
		});

		return paymentOperation.toXDR('base64');
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
	sourceAmount: string,
) {
	const url = `${server.serverURL}paths/strict-send`;

	const sourceAssetType = sourceAsset.getAssetType();
	const destinationAssetType = destinationAsset.getAssetType();

	const { code: sourceAssetCode, issuer: sourceAssetIssuer } = sourceAsset;
	const { code: destinationAssetCode, issuer: destinationAssetIssuer } = destinationAsset;

	const queryParams = new URLSearchParams();
	queryParams.append('source_amount', sourceAmount);

	if (sourceAssetType !== 'native') {
		queryParams.append(
			'source_asset_type',
			sourceAssetType === 'credit_alphanum4' ? 'credit_alphanum4' : 'credit_alphanum12',
		);
		queryParams.append('source_asset_code', sourceAssetCode);
		queryParams.append('source_asset_issuer', sourceAssetIssuer);
	} else {
		queryParams.append('source_asset_type', 'native');
	}

	if (destinationAssetType !== 'native') {
		queryParams.append('destination_assets', `${destinationAssetCode}:${destinationAssetIssuer}`);
	} else {
		queryParams.append('destination_assets', 'native');
	}

	const queryString = queryParams.toString();
	const {
		data: {
			_embedded: { records: offers },
		},
	} = await axios.get(`${url}?${queryString}`);

	if (offers.length === 0) {
		throw new Error('No offers found');
	}
	return offers;
}
