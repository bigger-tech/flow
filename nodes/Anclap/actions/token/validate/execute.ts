import { IExecuteFunctions } from 'n8n-workflow';

import AnchorCredentials from '../../../../../common/repository/anchor/AnchorCredentials';
import SEP10 from '../../../../../common/repository/anchor/SEP10';

export async function validate(this: IExecuteFunctions) {
	const validateXdr = this.getNodeParameter('validateXdr', 0) as string;
	const anclapCredentials = new AnchorCredentials(await this.getCredentials('anclapApi'));
	const sep10 = new SEP10(anclapCredentials);
	return await sep10.validateChallenge(validateXdr);
}
