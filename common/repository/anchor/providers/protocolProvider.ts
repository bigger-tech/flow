import AnchorCredentials from '../AnchorCredentials';
import SEP24 from '../SEP24';
import SEP6 from '../SEP6';
import { ProtocolEnum } from '../../../enum/anchor/protocolEnum';

export default function getProtocolProvider(
	anchorCredentials: AnchorCredentials,
	token: string,
	protocol: ProtocolEnum,
) {
	switch (protocol) {
		case ProtocolEnum.SEP24:
			return new SEP24(anchorCredentials, token);
		case ProtocolEnum.SEP6:
			return new SEP6(anchorCredentials, token);
		default:
			throw new Error(`Unsupported protocol: ${protocol}`);
	}
}
