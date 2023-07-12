import { IExecuteFunctions } from 'n8n-workflow';
import AnclapCredentials from '../../../transport/AnclapCredentials';
import { AnclapAssetCode } from '../../../transport/responses/IAnclapTransferServerInfoResponse';
import SEP24 from '../../../transport/SEP24';

export async function depositInteractive(this: IExecuteFunctions){
    const anclapCredentials = new AnclapCredentials(await this.getCredentials('anclapApi'));
	const token = this.getNodeParameter('token', 0) as string;
	const assetCode = this.getNodeParameter('assetCode', 0) as AnclapAssetCode;

    const getSep24DepositUrl = async () => {
		const sep24 = new SEP24(anclapCredentials, token);
		return await sep24.getDepositInteractiveUrl(assetCode);
	};

    return await getSep24DepositUrl();
}