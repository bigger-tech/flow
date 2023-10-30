import MykoboCredentials from '../MykoboCredentials';
import SEP24 from '../SEP24';
import SEP6 from '../SEP6';
import { Protocol } from '../enums/protocol';

export default function getProtocolProvider(
	mykoboCredentials: MykoboCredentials,
	token: string,
	protocol: Protocol,
) {
	switch (protocol) {
		case Protocol.SEP24:
			return new SEP24(mykoboCredentials, token);
		case Protocol.SEP6:
			return new SEP6(mykoboCredentials, token);
		default:
			throw new Error(`Unsupported protocol: ${protocol}`);
	}
}
