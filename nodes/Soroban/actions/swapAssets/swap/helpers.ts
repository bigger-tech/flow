import { Asset, Operation, Server } from 'soroban-client';
import axios from 'axios';

enum AssetTypeEnum {
	NATIVE = 'native',
	CREDIT_ALPHANUM_4 = 'credit_alphanum4',
	CREDIT_ALPHANUM_12 = 'credit_alphanum12',
}

enum PathQueryParamsEnum {
	SOURCE_AMOUNT = 'source_amount',
	SOURCE_ASSET_TYPE = 'source_asset_type',
	SOURCE_ASSET_CODE = 'source_asset_code',
	SOURCE_ASSET_ISSUER = 'source_asset_issuer',
	DESTINATION_ASSETS = 'destination_assets',
}

export async function getSwapAssetsOperation(
	server: Server,
	sourceAsset: Asset,
	destinationAsset: Asset,
	amount: string,
	publicKey: string,
	slippageAmount: string,
) {
	if (!slippageAmount) {
		throw new Error('Please, select a slippage tolerance');
	}

	const offers = await findOffers(server, sourceAsset, destinationAsset, amount);

	if (offers) {
		const { destination_amount } = offers[0];
		const paymentOperation = Operation.pathPaymentStrictSend({
			destination: publicKey,
			sendAsset: sourceAsset,
			sendAmount: amount,
			destAsset: destinationAsset,
			destMin: getMinDestinationAmount(destination_amount, slippageAmount),
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
	const url = `${server.serverURL}paths/strict-send`;

	const sourceAssetType = sourceAsset.getAssetType();
	const destinationAssetType = destinationAsset.getAssetType();

	const { code: sourceAssetCode, issuer: sourceAssetIssuer } = sourceAsset;
	const { code: destinationAssetCode, issuer: destinationAssetIssuer } = destinationAsset;

	const queryParams = new URLSearchParams();
	queryParams.append(PathQueryParamsEnum.SOURCE_AMOUNT, sourceAmount);

	if (sourceAssetType !== AssetTypeEnum.NATIVE) {
		queryParams.append(
			PathQueryParamsEnum.SOURCE_ASSET_TYPE,
			sourceAssetType === AssetTypeEnum.CREDIT_ALPHANUM_4
				? AssetTypeEnum.CREDIT_ALPHANUM_4
				: AssetTypeEnum.CREDIT_ALPHANUM_12,
		);
		queryParams.append(PathQueryParamsEnum.SOURCE_ASSET_CODE, sourceAssetCode);
		queryParams.append(PathQueryParamsEnum.SOURCE_ASSET_ISSUER, sourceAssetIssuer);
	} else {
		queryParams.append(PathQueryParamsEnum.SOURCE_ASSET_TYPE, AssetTypeEnum.NATIVE);
	}

	if (destinationAssetType !== AssetTypeEnum.NATIVE) {
		queryParams.append(
			PathQueryParamsEnum.DESTINATION_ASSETS,
			`${destinationAssetCode}:${destinationAssetIssuer}`,
		);
	} else {
		queryParams.append(PathQueryParamsEnum.DESTINATION_ASSETS, AssetTypeEnum.NATIVE);
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
