import axios from 'axios';
import AnchorCredentials from './AnchorCredentials';
import { IBinaryFieldRequest } from '../../requests/anchor/KYCRequest/IBinaryFieldRequest';
import { ICallbackRequest } from '../../requests/anchor/KYCRequest/ICallbackRequest';
import { IFilesRequest } from '../../requests/anchor/KYCRequest/IFilesRequest';
import { IKYCDeleteRequest } from '../../requests/anchor/KYCRequest/IKYCDeleteRequest';
import { IKYCRequest } from '../../requests/anchor/KYCRequest/IKYCRequest';
import { IKYCVerification } from '../../requests/anchor/KYCRequest/IKYCVerification';
import queryBuilder from '../../utils/anchor/queryBuilder';
import AxiosHttpRequestError from '../../errors/anchor/errors/AxiosHttpRequestError';
import PayloadBuilder from '../../utils/anchor/PayloadBuilder';
import convertToSnakeCase from '../../utils/anchor/convertToSnakeCase';
import { IBaseStandardFieldsRequest } from '../../requests/anchor/StandardFieldsRequest/IBaseStandardFieldsRequest';
import FormData from 'form-data';
import { getImageFormatFromBase64 } from '../../utils/anchor/imageFormatFromBase64';

export default class SEP12 {
	private anchorCredentials: AnchorCredentials;
	private token: string;

	constructor(anchorCredentials: AnchorCredentials, token: string) {
		this.anchorCredentials = anchorCredentials;
		this.token = token;
	}

	async getKYCStatus(request?: IKYCRequest) {
		const toml = await this.anchorCredentials.getToml();

		const url = request
			? `${toml.KYC_SERVER}/customer?${queryBuilder(request)}`
			: `${toml.KYC_SERVER}/customer`;

		try {
			const kycStatus = await axios.get(url, {
				headers: { Authorization: `Bearer ${this.token}` },
			});

			return kycStatus.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async sendKYCInformation(request: IBaseStandardFieldsRequest) {
		const toml = await this.anchorCredentials.getToml();

		const payload = new PayloadBuilder(request)
			.parseObjectKeyCaseType(convertToSnakeCase)
			.filterUndefinedValues()
			.build();

		try {
			const customerId = await axios.put(`${toml.KYC_SERVER}/customer`, payload, {
				headers: { Authorization: `Bearer ${this.token}` },
			});

			return customerId.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async setCallbackUrl(request: ICallbackRequest) {
		const toml = await this.anchorCredentials.getToml();
		request.account = this.anchorCredentials.publicKey;

		const payload = new PayloadBuilder(request)
			.parseObjectKeyCaseType(convertToSnakeCase)
			.filterUndefinedValues()
			.build();

		try {
			const response = await axios.put(`${toml.KYC_SERVER}/customer/callback`, payload, {
				headers: { Authorization: `Bearer ${this.token}` },
			});

			return response.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async sendVerificationCodes(request: IKYCVerification) {
		const toml = await this.anchorCredentials.getToml();

		const payload = new PayloadBuilder(request)
			.parseObjectKeyCaseType(convertToSnakeCase)
			.filterUndefinedValues()
			.build();

		try {
			const verificationStatus = await axios.put(
				`${toml.KYC_SERVER}/customer/verification`,
				payload,
				{ headers: { Authorization: `Bearer ${this.token}` } },
			);

			return verificationStatus.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async deleteKYCInformation(request?: IKYCDeleteRequest) {
		const toml = await this.anchorCredentials.getToml();

		if (!request) {
			request = {};
		}
		request.account = this.anchorCredentials.publicKey;
		const queryParams = queryBuilder(request);

		try {
			const deleteStatus = await axios.delete(`${toml.KYC_SERVER}/customer/${queryParams}`, {
				headers: { Authorization: `Bearer ${this.token}` },
			});

			return deleteStatus.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async uploadBinaryFile(request: IBinaryFieldRequest) {
		const toml = await this.anchorCredentials.getToml();

		const imageFormat = getImageFormatFromBase64(request.file);
		if (!imageFormat) {
			throw new Error(`Invalid image format, try again.`);
		}

		const imageBuffer = Buffer.from(request.file, 'base64');

		const formData = new FormData();
		formData.append('file', imageBuffer, `file.${imageFormat}`);
		try {
			const fileId = await axios.post(`${toml.KYC_SERVER}/customer/files`, formData, {
				headers: { Authorization: `Bearer ${this.token}`, 'Content-Type': 'multipart/form-data' },
			});
			return fileId.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}

	async getFiles(request?: IFilesRequest) {
		const toml = await this.anchorCredentials.getToml();

		const url = request
			? `${toml.KYC_SERVER}/customer/files?${queryBuilder(request)}`
			: `${toml.KYC_SERVER}/customer/files`;

		try {
			const files = await axios.get(url, {
				headers: { Authorization: `Bearer ${this.token}` },
			});

			return files.data;
		} catch (e) {
			throw new AxiosHttpRequestError(e);
		}
	}
}
