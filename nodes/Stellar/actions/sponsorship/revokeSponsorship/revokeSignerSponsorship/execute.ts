import { IExecuteFunctions } from 'n8n-workflow';
import { Operation } from 'stellar-sdk';

export async function revokeSignerSponsorship(this: IExecuteFunctions) {
	const account = this.getNodeParameter('account', 0) as string;
	const signerType = this.getNodeParameter('signerType', 0) as keyof ISigner;
	const signerKey = this.getNodeParameter('signerKey', 0) as string;
	let signer;
	switch (signerType) {
		case 'ed25519PublicKey':
			signer = { ed25519PublicKey: signerKey };
			break;
		case 'sha256Hash':
			signer = { sha256Hash: signerKey };
			break;
		case 'preAuthTx':
			signer = { preAuthTx: signerKey };
			break;
		default:
			signer = { ed25519PublicKey: signerKey };
	}
	const revokeSignerSponsorshipOperation = Operation.revokeSignerSponsorship({
		account,
		signer,
	});
	return { operation: revokeSignerSponsorshipOperation };
}
type ISigner = 'ed25519PublicKey' | 'sha256Hash' | 'preAuthTx';
