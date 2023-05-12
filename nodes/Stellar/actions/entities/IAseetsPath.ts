export default interface IAseetsPath {
	values: {
		code: string;
		issuer: string;
		isNative?: boolean;
	}[];
}
