export default class PayloadBuilder {
	private obj: object;
  
	constructor(obj: object) {
	  this.obj = obj;
	}
  
	parseObjectKeyCaseType(caseTypeParser: Function): PayloadBuilder {
	  this.obj = Object.fromEntries(
		Object.entries(this.obj).map(([key, value]) => [caseTypeParser(key), value])
	  );
	  return this;
	}
  
	filterUndefinedValues(): PayloadBuilder {
	  const filtered: Record<string, any> = {};
  
	  for (const [key, value] of Object.entries(this.obj)) {
		if (value !== undefined && value.length !== 0) {
		  filtered[key] = value;
		}
	  }
  
	  this.obj = filtered;
	  return this;
	}
  
	build(): object {
	  return this.obj;
	}
  }