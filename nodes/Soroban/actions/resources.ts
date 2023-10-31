import IOperations from '../../../common/interfaces/stellar/IOperations';
import { SorobanResources } from './entities/SorobanNode';
import { makePayment, pathPaymentStrictReceive, pathPaymentStrictSend } from './payments';
import { bumpSequence, manageData, setOptions } from './settings';
import { createPassiveSellOffer, manageBuyOffer, manageSellOffer } from './offers';
import { createAccount } from './newAccount';
import { accountMerge } from './accountMerge';
import { fundAccount } from './fundAccount';
import { build, sign } from './transaction';
import { beginSponsoring, endSponsoring, revokeSponsorship } from './sponsorship';
import { claimClaimableBalance, createClaimableBalance } from './claimable';
import { clawback, clawbackClaimableBalance } from './clawback';
import { changeTrust, setTrustline } from './trust';
import { swap } from './swapAssets';
import { liquidityPoolDeposit, liquidityPoolWithdraw } from './liquidityPool';
import { findLiquidityPool, findPayments } from './server';

const resources: { [key in keyof SorobanResources]: IOperations } = {
	newAccount: {
		operations: {
			createAccount: { execute: createAccount.execute },
		},
	},
	server: {
		operations: {
			findPayments: { execute: findPayments.execute },
			findLiquidityPool: { execute: findLiquidityPool.execute },
		},
	},
	settings: {
		operations: {
			bumpSequence: { execute: bumpSequence.execute },
			manageData: { execute: manageData.execute },
			setOptions: { execute: setOptions.execute },
		},
	},
	fundAccount: {
		operations: {
			fundAccount: { execute: fundAccount.execute },
		},
	},
	liquidityPool: {
		operations: {
			liquidityPoolDeposit: { execute: liquidityPoolDeposit.execute },
			liquidityPoolWithdraw: { execute: liquidityPoolWithdraw.execute },
		},
	},
	transaction: {
		operations: { build: { execute: build.execute }, sign: { execute: sign.execute } },
	},
	accountMerge: { operations: { accountMerge: { execute: accountMerge.execute } } },
	payments: {
		operations: {
			makePayment: { execute: makePayment.execute },
			pathPaymentStrictReceive: { execute: pathPaymentStrictReceive.execute },
			pathPaymentStrictSend: { execute: pathPaymentStrictSend.execute },
		},
	},
	offers: {
		operations: {
			createPassiveSellOffer: { execute: createPassiveSellOffer.execute },
			manageBuyOffer: { execute: manageBuyOffer.execute },
			manageSellOffer: { execute: manageSellOffer.execute },
		},
	},
	sponsorship: {
		operations: {
			beginSponsoring: { execute: beginSponsoring.execute },
			endSponsoring: { execute: endSponsoring.execute },
			revokeSponsorship: { execute: revokeSponsorship.execute },
		},
	},
	claimableBalance: {
		operations: {
			claimClaimableBalance: { execute: claimClaimableBalance.execute },
			createClaimableBalance: { execute: createClaimableBalance.execute },
		},
	},
	clawback: {
		operations: {
			clawback: { execute: clawback.execute },
			clawbackClaimableBalance: { execute: clawbackClaimableBalance.execute },
		},
	},
	trust: {
		operations: {
			changeTrust: { execute: changeTrust.execute },
			setTrustline: { execute: setTrustline.execute },
		},
	},
	swapAssets: {
		operations: {
			swap: { execute: swap.execute },
		},
	},
};

export default resources;
