export default function parseObjectKeyCaseType(obj: object, caseTypeParser: Function): object {
	return Object.fromEntries(
		Object.entries(obj).map(([key, value]) => [caseTypeParser(key), value])
	  )
}
