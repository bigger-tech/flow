import { IExecuteFunctions } from 'n8n-workflow';
import { Asset, Claimant, Operation } from 'stellar-sdk';
import { checkAsset, convertAmountToBigNumber } from '../../../transport';
import IAsset from '../../entities/IAsset';

export async function createClaimableBalance(this: IExecuteFunctions) {
	const claimableAsset = this.getNodeParameter('claimableAsset', 0) as IAsset;
	const claimableAmount = this.getNodeParameter('amount', 0) as number;
	let asset: Asset;

	checkAsset(claimableAsset);

	if (claimableAsset.values.isNative) {
		asset = Asset.native();
	} else {
		asset = new Asset(claimableAsset.values.code, claimableAsset.values.issuer);
	}

	const amount = convertAmountToBigNumber(claimableAmount);
	let claimants: Claimant[] = [];
	const claimantsValues = this.getNodeParameter('claimants', 0, []) as any;

	claimantsValues.values.forEach((claimantValues: any) => {
		const destination = claimantValues.destination;
		const predicateValues = claimantValues.predicate.values;
		let predicate;
		if (predicateValues.isPredicateConditional) {
			switch (predicateValues.predicateType) {
				case 'time':
					predicate = buildTimePredicate(predicateValues);
					break;
				case 'and':
					const andPredicate1 = buildPredicate(predicateValues.predicate1.values);
					const andPredicate2 = buildPredicate(predicateValues.predicate2.values);
					predicate = Claimant.predicateAnd(andPredicate1, andPredicate2);
					break;
				case 'or':
					const orPredicate1 = buildPredicate(predicateValues.predicate1.values);
					const orPredicate2 = buildPredicate(predicateValues.predicate2.values);
					predicate = Claimant.predicateOr(orPredicate1, orPredicate2);
					break;
				case 'not':
					const notPredicate = buildPredicate(predicateValues.predicate1.values);
					predicate = Claimant.predicateNot(notPredicate);
					break;
			}
		} else {
			predicate = Claimant.predicateUnconditional();
		}
		const claimant = new Claimant(destination, predicate);
		claimants.push(claimant);
	});
	const createClaimableBalanceOperation = Operation.createClaimableBalance({
		asset,
		amount,
		claimants,
	}).toXDR('base64');
	return { operation: createClaimableBalanceOperation };
}

function buildTimePredicate(predicateValues: any) {
	let predicate;
	if (predicateValues.isPredicateTimeRelative)
		predicate = Claimant.predicateBeforeRelativeTime(predicateValues.predicateTimeValue.toString());
	else {
		predicate = Claimant.predicateBeforeAbsoluteTime(predicateValues.predicateTimeValue.toString());
	}
	return predicate;
}

function buildSubpredicate(subPredicateValues: any) {
	let subpredicate;
	if (subPredicateValues.isPredicateConditional) {
		subpredicate = buildTimePredicate(subPredicateValues);
	} else {
		subpredicate = Claimant.predicateUnconditional();
	}
	return subpredicate;
}

function buildPredicate(predicateValues: any) {
	let predicate;
	if (predicateValues.isPredicateConditional) {
		switch (predicateValues.predicateType) {
			case 'time':
				predicate = buildTimePredicate(predicateValues);
				break;
			case 'and':
				const andSubpredicate1 = buildSubpredicate(predicateValues.predicate1.values);
				const andSubpredicate2 = buildSubpredicate(predicateValues.predicate2.values);
				predicate = Claimant.predicateAnd(andSubpredicate1, andSubpredicate2);
				break;
			case 'or':
				const orSubpredicate1 = buildSubpredicate(predicateValues.predicate1.values);
				const orSubpredicate2 = buildSubpredicate(predicateValues.predicate2.values);
				predicate = Claimant.predicateAnd(orSubpredicate1, orSubpredicate2);
				break;

			case 'not':
				const notSubpredicate = buildSubpredicate(predicateValues.predicate1.values);
				predicate = Claimant.predicateNot(notSubpredicate);
				break;
			default:
				predicate = Claimant.predicateUnconditional();
				break;
		}
	} else {
		predicate = Claimant.predicateUnconditional();
	}
	return predicate;
}
