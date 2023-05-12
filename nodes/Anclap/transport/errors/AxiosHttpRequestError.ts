import axios from 'axios';

export default class AxiosHttpRequestError extends Error {
	private error: any;

	constructor(error: any) {
		super();
		this.error = error;

		if (axios.isAxiosError(this.error)) {
			this.message = `Axios error: ${error.status} ${error.response && error.response.data}`;
		}
	}
}
