export default interface IAsset {
	destinationAsset: {
		code: string;
		issuer: string;
	};
	sendingAsset: {
		code: string;
		issuer: string;
	};
	sellingAsset: {
		code: string;
		issuer: string;
	};
	buyingAsset: {
		code: string;
		issuer: string;
	};
}
