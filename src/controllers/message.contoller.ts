import express, { response } from "express";
import db from "../models/index";
import { Sequelize, Op, OrOperator } from "sequelize";
import { MessageParam, MessageUpdateParam } from "../models/message.model";
import Controller from "./controller";
import { logger } from "../server";
const Message = db.messages;

export default class MessageController extends Controller {
	constructor() {
		super();
		this.modelName = "message";
	}
	// Create and Save a new Message
	create = async (req: express.Request, res: express.Response) => {
		// Create a Message
		const message = req.body as MessageParam;
		try {
			// Save Message in the database
			await Message.create(message)
				.then((data) => {
					res.status(201).json(this.successResponse(data, 201));
				})
				.catch((err) => {
					logger.error(err);
					res.status(500).json(this.errorResponse(500, "Some error occurred while creating the Message."));
				});
		} catch (err) {
			logger.error(err);
			res.status(500).json(this.errorResponse(500, "Some error occurred while creating the Message."));
		}
	};

	// Retrieve all Messages from the database.
	findAll = async (req: express.Request, res: express.Response) => {
		const search = req.query.search;
		let condition;
		if (search) {
			condition = { name: { [Op.like]: `%${search}%` } };
		}
		const page = req.query.page ? Number(req.query.page) : 1;
		const limit = req.query.limit ? Number(req.query.limit) : 20;
		const nOffset = limit * (page - 1);

		try {
			await Message.findAndCountAll({ where: condition, offset: nOffset, limit: limit, order: [["id", "ASC"]] })
				.then((data) => {
					return res.json(this.successResponse(this.paginate(data, page, limit), 200));
				})
				.catch((err) => {
					logger.error(err);
					return res.status(500).json(this.errorResponse(500, String(err)));
				});
		} catch (err) {
			logger.error(err);
			return res.status(500).json(this.errorResponse(500, "Some error occurred while retrieving the Message."));
		}
	};

	// Find a single Message with an id
	findOne = async (req: express.Request, res: express.Response) => {
		const id = req.params.id;

		await Message.findByPk(id)
			.then((data) => {
				return res.json(this.successResponse(data, 200));
			})
			.catch((err) => {
				logger.error(err);
				return res.status(500).json(this.errorResponse(500, "Error retrieving Message with id=" + id));
			});
	};
	// Update a Message by the id in the request
	update = async (req: express.Request, res: express.Response) => {
		const id = req.params.id;

		try {
			await Message.update(req.body as MessageUpdateParam, {
				where: { id: id },
			})
				.then((num) => {
					if (Number(num) === 1) {
						return res.json(this.successResponse({}, 200, "Message was updated successfully."));
					} else {
						return res.json(this.errorResponse(404, `Cannot update Message with id=${id}. Maybe Message was ot found or request body is empty!`));
					}
				})
				.catch((err) => {
					logger.error(err);
					return res.status(500).json(this.errorResponse(500, "Error updating Message with id=" + id));
				});
		} catch (err) {
			logger.error(err);
			return res.status(500).json(this.errorResponse(500, "Some error occurred"));
		}
	};

	// Delete a Message with the specified id in the request
	delete = async (req: express.Request, res: express.Response) => {
		const id = req.params.id;
		try {
			await Message.destroy({
				where: { id: id },
			})
				.then((num) => {
					if (Number(num) == 1) {
						return res.json(this.successResponse({}, 200, "Message was deleted successfully!"));
					} else {
						return res.json(this.errorResponse(500, `Cannot delete Message with id=${id}. Maybe Message was not found!`));
					}
				})
				.catch((err) => {
					logger.error(err);
					return res.status(500).json(this.errorResponse(500, `Cannot delete Message with id=${id}`));
				});
		} catch (err) {
			logger.error(err);
			return res.status(500).json(this.errorResponse(500, "Some error occurred"));
		}
	};

	// Delete all Messages from the database.
	deleteAll = async (req: express.Request, res: express.Response) => {
		try {
			await Message.destroy({
				where: {},
				truncate: false,
			})
				.then((nums) => {
					return res.json(this.successResponse({}, 200, `${nums} Messages were deleted successfully!`));
				})
				.catch((err) => {
					logger.error(err);
					return res.status(500).json(this.errorResponse(500, err.message || "Some error occurred while removing all mssages."));
				});
		} catch (err) {
			logger.error(err);
			return res.status(500).json(this.errorResponse(500, "Some error occurred"));
		}
	};
}
