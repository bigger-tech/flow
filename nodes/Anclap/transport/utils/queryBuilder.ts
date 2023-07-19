import PayloadBuilder from './PayloadBuilder';
import convertToSnakeCase from './convertToSnakeCase';

export default function queryBuilder(input: Record<string, any>): string {
	const filteredInput = new PayloadBuilder(input).filterUndefinedValues().build();

	return Object.entries(filteredInput)
		.map(([key, value]) => `${convertToSnakeCase(key)}=${encodeURIComponent(value)}`)
		.join('&');
}
