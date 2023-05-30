import { IExecuteFunctions } from 'n8n-workflow';
import { Claimant, Operation } from 'stellar-sdk';
import ClaimantPredicate from 'stellar-sdk';
import { buildAsset, convertAmountToBigNumber } from '../../../transport';
import IAsset from '../../entities/IAsset';
import IClaimants from '../../entities/IClaimants';
import IPredicate from '../../entities/IPredicate';
import InvalidPredicateError from './error/InvalidPredicateError';

export async function createClaimableBalance(this: IExecuteFunctions) {
	try {
		const { values: claimableAsset } = this.getNodeParameter('claimableAsset', 0) as IAsset;
		const claimableAmount = this.getNodeParameter('amount', 0) as number;
		const { values: claimantsValues } = this.getNodeParameter('claimants', 0) as IClaimants;

		const asset = buildAsset(claimableAsset);
		const claimants = buildClaimantsList(claimantsValues);
		const amount = convertAmountToBigNumber(claimableAmount);

		const createClaimableBalanceOperation = Operation.createClaimableBalance({
			asset,
			amount,
			claimants,
		}).toXDR('base64');

		return { operation: createClaimableBalanceOperation };
	} catch (error) {
		throw new Error(error);
	}
}

function buildClaimantsList(claimantsValues: IClaimants['values']) {
	const claimants: Claimant[] = [];
	claimantsValues.forEach((claimantValues) => {
		const destination = claimantValues.destination;
		const predicateValues = claimantValues.predicate.values;
		let predicate;
		if (predicateValues.isPredicateConditional) {
			switch (predicateValues.predicateType) {
				case 'time':
					predicate = buildTimePredicate(predicateValues);
					break;
				case 'and':
					if (predicateValues.predicate1 && predicateValues.predicate2) {
						const andPredicate1 = buildPredicate(predicateValues.predicate1?.values);
						const andPredicate2 = buildPredicate(predicateValues.predicate2?.values);
						predicate = Claimant.predicateAnd(andPredicate1, andPredicate2);
					}
					break;
				case 'or':
					if (predicateValues.predicate1 && predicateValues.predicate2) {
						const orPredicate1 = buildPredicate(predicateValues.predicate1?.values);
						const orPredicate2 = buildPredicate(predicateValues.predicate2?.values);
						predicate = Claimant.predicateOr(orPredicate1, orPredicate2);
					}
					break;
				case 'not':
					if (predicateValues.predicate1) {
						const notPredicate = buildPredicate(predicateValues.predicate1?.values);
						predicate = Claimant.predicateNot(notPredicate);
					}
					break;
			}
		} else {
			predicate = Claimant.predicateUnconditional();
		}
		const claimant = new Claimant(destination, predicate);
		claimants.push(claimant);
	});
	return claimants;
}

function buildTimePredicate(predicateValues: IPredicate) {
	let predicate;
	if (predicateValues.predicateTimeValue) {
		predicateValues.isPredicateTimeRelative
			? (predicate = Claimant.predicateBeforeRelativeTime(
					predicateValues.predicateTimeValue.toString(),
			  ))
			: (predicate = Claimant.predicateBeforeAbsoluteTime(
					predicateValues.predicateTimeValue.toString(),
			  ));
	}
	return predicate;
}

function buildSubpredicate(subPredicateValues: IPredicate): typeof ClaimantPredicate {
	let subpredicate;
	if (subPredicateValues.isPredicateConditional) {
		subpredicate = buildTimePredicate(subPredicateValues);
	} else {
		subpredicate = Claimant.predicateUnconditional();
	}
	return subpredicate;
}

function buildPredicate(predicateValues: IPredicate): typeof ClaimantPredicate {
	let predicate;
	if (predicateValues.isPredicateConditional) {
		switch (predicateValues.predicateType) {
			case 'time':
				predicate = buildTimePredicate(predicateValues);
				break;
			case 'and':
				if (predicateValues.predicate1 && predicateValues.predicate2) {
					const andSubpredicate1 = buildSubpredicate(predicateValues.predicate1.values);
					const andSubpredicate2 = buildSubpredicate(predicateValues.predicate2.values);
					predicate = Claimant.predicateAnd(andSubpredicate1, andSubpredicate2);
				}
				break;
			case 'or':
				if (predicateValues.predicate1 && predicateValues.predicate2) {
					const orSubpredicate1 = buildSubpredicate(predicateValues.predicate1.values);
					const orSubpredicate2 = buildSubpredicate(predicateValues.predicate2.values);
					predicate = Claimant.predicateAnd(orSubpredicate1, orSubpredicate2);
				}
				break;
			case 'not':
				if (predicateValues.predicate1) {
					const notSubpredicate = buildSubpredicate(predicateValues.predicate1.values);
					predicate = Claimant.predicateNot(notSubpredicate);
				}
				break;
			default:
				throw InvalidPredicateError;
		}
	} else {
		predicate = Claimant.predicateUnconditional();
	}
	return predicate;
}
