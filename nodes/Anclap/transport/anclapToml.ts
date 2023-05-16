import type { IExecuteFunctions, ITriggerFunctions } from 'n8n-workflow';
import GetAnclapTomlError from './errors/GetAnclapTomlError';
import IAnclapTomlResponse from './IAnclapTomlResponse';
import SEP1 from './SEP1';

export async function getAnclapToml(
	this: IExecuteFunctions | ITriggerFunctions,
): Promise<IAnclapTomlResponse> {
	const credentials = await this.getCredentials('stellarNetworkApi');
	const stellarNetwork = credentials.network as string;
	const sep1 = new SEP1(stellarNetwork);
	const anclapToml = sep1.getInfo();

	if (anclapToml) {
		return anclapToml;
	} else {
		throw new GetAnclapTomlError();
	}
}
