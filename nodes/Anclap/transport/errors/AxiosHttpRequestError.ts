import axios from 'axios';

export default class AxiosHttpRequestError extends Error {
	private error: any;

	constructor(error: any) {
		super();
		this.error = error;

		if (axios.isAxiosError(this.error)) {
			const errorType = error.response.data.error;
			const errorDetail = error.response.data.detail;
			const errorStatus = error.response.status;

			this.message = `${errorStatus} "${errorType}" "${errorDetail}"`;
		}
	}
}
