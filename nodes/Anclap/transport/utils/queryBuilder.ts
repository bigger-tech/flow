export default function queryBuilder(input: Record<string, any>): string {
	const filteredInput = filterUndefinedValues(input);

	return Object.entries(filteredInput)
		.map(([key, value]) => `${convertKeyToSnakeCase(key)}=${encodeURIComponent(value)}`)
		.join('&');
}

function filterUndefinedValues(input: Record<string, any>): Record<string, any> {
	const filtered: Record<string, any> = {};

	for (const [key, value] of Object.entries(input)) {
		if (value !== undefined && value.length !== 0) {
			filtered[key] = value;
		}
	}

	return filtered;
}

function convertKeyToSnakeCase(key: string): string {
	return key.replace(/([A-Z])/g, '_$1').toLowerCase();
}
