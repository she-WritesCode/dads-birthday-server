import express from "express";
import { Model, where } from "sequelize";

export default class Controller {
	/**
	 * singular version of name
	 */
	modelName: string;
	successResponse = (data: Object, code: number, message?: string) => {
		return {
			code,
			data,
			success: true,
			message: message ? message : "successful",
		};
	};

	errorResponse = (code: number, message?: string) => {
		return {
			code,
			error: true,
			message: message ? message : "an error occured",
		};
	};

	paginate = (
		result: {
			rows: Model<any, any>[];
			count: number;
		},
		page: number,
		pageSize: number
	) => {
		const totalPages = Math.ceil(result.count / pageSize);
		let res: PaginationResponse = {
			total: result.count,
			totalPages,
			currentPage: page,
			limit: pageSize,
			previousPage: page - 1,
			nextPage: page == totalPages ? totalPages : page + 1,
		};
		res[`${this.modelName}s`] = result.rows;
		return res;
	};
}

export interface PaginationResponse {
	[key: string]: any;
	total: number;
	totalPages: number;
	currentPage: number;
	previousPage?: number;
	nextPage?: number;
	limit: number;
	data?: any;
}
