export default class Controller {
	successResponse = (data: Object, code: number, message?: string) => {
		return {
			code,
			data,
			success: true,
			message: message ? message : "successful",
		};
	}

	errorResponse = (code: number, message?: string) => {
		return {
			code,
			error: true,
			message: message ? message : "an error occured",
		};
	}
}
