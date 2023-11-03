import { IExecuteFunctions } from 'n8n-workflow';
import QuoteRequest from '../../../../../common/requests/anchor/PricesRequest/QuoteRequest';
import SEP38 from '../../../../../common/repository/anchor/SEP38';
import AnchorCredentials from '../../../../../common/repository/anchor/AnchorCredentials';

export async function getQuote(this: IExecuteFunctions) {
	const anclapCredentials = new AnchorCredentials(await this.getCredentials('anclapApi'));
	const token = this.getNodeParameter('token', 0) as string;

	const id = this.getNodeParameter('id', 0) as string;

	const sep38 = new SEP38(anclapCredentials, token);

	const quoteRequest = new QuoteRequest({ id });

	return await sep38.getQuoteById(quoteRequest);
}
