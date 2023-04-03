export default interface IAsset {
	destinationAsset: {
		code: string;
		issuer: string;
	};
	sendingAsset: {
		code: string;
		issuer: string;
	};
}
