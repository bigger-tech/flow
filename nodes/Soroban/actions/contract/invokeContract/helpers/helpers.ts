import { Address, nativeToScVal, xdr } from 'soroban-client';

export const toScVal = (arg: any, type?: string): xdr.ScVal => {
	type = (type && type.toLowerCase()) || '';
	switch (type) {
		case 'address':
		case 'scvAddress'.toLowerCase():
		case 'scvContractInstance'.toLowerCase():
			return new Address(arg).toScVal();
		case 'bytes':
		case 'scvBytes'.toLowerCase():
		case 'scvBytesN'.toLowerCase():
			return xdr.ScVal.scvBytes(Buffer.from(arg, 'hex'));
		case 'symbol':
			return xdr.ScVal.scvSymbol(arg);
		case 'scvBool'.toLowerCase():
			return xdr.ScVal.scvBool(arg != null);
		case 'i32'.toLowerCase():
		case 'scvI32'.toLowerCase():
			return xdr.ScVal.scvI32(Number(arg));
		case 'i64'.toLowerCase():
		case 'scvI64'.toLowerCase():
			return nativeToScVal(arg, { type: 'i64' });
		case 'i128'.toLowerCase():
		case 'scvI128'.toLowerCase():
			return nativeToScVal(arg, { type: 'i128' });
		case 'i256'.toLowerCase():
		case 'scvI256'.toLowerCase():
			return nativeToScVal(arg, { type: 'i256' });
		case 'u64'.toLowerCase():
		case 'scvU64'.toLowerCase():
			return nativeToScVal(arg, { type: 'u64' });
		case 'u32'.toLowerCase():
		case 'scvU32'.toLowerCase():
			return xdr.ScVal.scvU32(Number(arg));
		case 'u128'.toLowerCase():
		case 'scvU128'.toLowerCase():
			return nativeToScVal(arg, { type: 'u128' });
		case 'u256'.toLowerCase():
		case 'scvU256'.toLowerCase():
			return nativeToScVal(arg, { type: 'u256' });
		case 'timepoint'.toLowerCase():
		case 'scvTimepoint'.toLowerCase():
			var val: xdr.TimePoint = new xdr.Uint64(arg);
			return xdr.ScVal.scvTimepoint(val);
		case 'duration'.toLowerCase():
		case 'scvDuration'.toLowerCase():
			var val: xdr.Duration = new xdr.Uint64(arg);
			return xdr.ScVal.scvDuration(val);
		case 'boolean':
			return xdr.ScVal.scvBool(arg);
		case 'object':
			return xdr.ScVal.scvBytes(arg);
		case 'scvString':
			return xdr.ScVal.scvString(arg);
		default:
			return xdr.ScVal.scvString(arg);
	}
};

export interface CustomScVal {
	type: string;
	value: string;
}
