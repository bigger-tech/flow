export const binascii = (function () {
	const hexlify = function (str: string) {
		let result = '';
		const padding = '00';
		for (let i = 0, l = str.length; i < l; i++) {
			const digit = str.charCodeAt(i).toString(16);
			const padded = (padding + digit).slice(-2);
			result += padded;
		}
		return result;
	};

	const unhexlify = function (str: string) {
		let result = '';
		for (let i = 0, l = str.length; i < l; i += 2) {
			result += String.fromCharCode(parseInt(str.substr(i, 2), 16));
		}
		return result;
	};

	return {
		b2a_hex: hexlify,
		hexlify: hexlify,

		a2b_hex: unhexlify,
		unhexlify: unhexlify,
	};
})();
