export default interface IPredicate {
	isPredicateConditional: boolean;
	predicateType?: string;
	isPredicateTimeRelative?: boolean;
	predicateTimeValue?: string;
	predicate1?: { values: IPredicate };
	predicate2?: { values: IPredicate };
}
