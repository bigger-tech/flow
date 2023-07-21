import { IExecuteFunctions } from "n8n-workflow";

export async function convertAnchorMemo(this: IExecuteFunctions){
    const memo = this.getNodeParameter('memo', 0) as string;

    const buffer = Buffer.from(memo, 'base64');
    return buffer.toString('hex');
}