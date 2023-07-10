import { IExecuteFunctions } from "n8n-core";
import AnclapCredentials from "../../../transport/AnclapCredentials";
import { OffChainOperationType, TransactionType } from "../../../transport/types";
import SEP6 from '../../../transport/SEP6';
import FeeRequest from "../../../transport/requests/FeeRequest/FeeRequest";

export async function fee(this: IExecuteFunctions){
    const anclapCredentials = new AnclapCredentials(await this.getCredentials('anclapApi'));
	const token = this.getNodeParameter('token', 0) as string;

    const getFeeAmount = async() => {
        const operationType = this.getNodeParameter('operationType', 0) as TransactionType;
        const type = this.getNodeParameter('type', 0) as OffChainOperationType;
        const assetCode= this.getNodeParameter('assetCode', 0) as string;
        const amount = this.getNodeParameter('amount', 0) as number;

        const request = new FeeRequest({
            operation: operationType,
            type,
            assetCode,
            amount
        })

        const sep6 = new SEP6(anclapCredentials, token);

        return await sep6.getFee(request);
    }

    return await getFeeAmount();
}