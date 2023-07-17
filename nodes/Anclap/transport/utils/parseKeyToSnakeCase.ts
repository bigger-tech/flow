import convertToSnakeCase from './convertToSnakeCase';

export default function parsePayloadToSnakeCase(obj: any): any {
	if (typeof obj === 'object' && obj !== null) {
		if (Array.isArray(obj)) {
			return obj.map((item) => parsePayloadToSnakeCase(item));
		} else {
			const snakeCaseObj: any = {};
			for (const key in obj) {
				if (obj.hasOwnProperty(key)) {
					const snakeCaseKey = convertToSnakeCase(key);
					snakeCaseObj[snakeCaseKey] = parsePayloadToSnakeCase(obj[key]);
				}
			}
			return snakeCaseObj;
		}
	}
	return obj;
}
