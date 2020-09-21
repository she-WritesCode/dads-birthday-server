import express, { response } from "express";
import db from "../models/index";
import { Op } from "sequelize";
import { MessageParam, MessageUpdateParam } from "../models/message.model";
import Controller from "./controller";
const Message = db.messages;

export default class MessageController extends Controller {
	// Create and Save a new Message
	create = async (req: express.Request, res: express.Response) => {
		// Create a Message
		const message = req.body as MessageParam;

		// Save Message in the database
		await Message.create(message)
			.then((data) => {
				return res.status(201).json(this.successResponse(data, 201));
			})
			.catch((err) => {
				return res.status(500).json(this.errorResponse(500, "Some error occurred while creating the await Message."));
			});
	};

	// Retrieve all Messages from the database.
	findAll = async (req: express.Request, res: express.Response) => {
		const name = req.query.name;
		const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

		await Message.findAll({ where: condition })
			.then((data) => {
				return res.json(this.successResponse(data, 200));
			})
			.catch((err) => {
				console.error(err);
				return res.status(500).json(this.errorResponse(500, "Some error occurred while retrieving the await Message."));
			});
	};

	// Find a single Message with an id
	findOne = async (req: express.Request, res: express.Response) => {
		const id = req.params.id;

		await Message.findByPk(id)
			.then((data) => {
				return res.json(this.successResponse(data, 200));
			})
			.catch((err) => {
				return res.status(500).json(this.errorResponse(500, "Error retrieving Message with id=" + id));
			});
	};
	// Update a Message by the id in the request
	update = async (req: express.Request, res: express.Response) => {
		const id = req.params.id;

		await Message.update(req.body as MessageUpdateParam, {
			where: { id: id },
		})
			.then((num) => {
				if (typeof num == "number") {
					if (num === 1) {
						return res.json(this.successResponse({}, 200, "Message was updated successfully."));
					} else {
						return res.json(this.errorResponse(500, `Cannot update Message with id=${id}. Maybe Message was ot found or request body is empty!`));
					}
				}
			})
			.catch((err) => {
				return res.status(500).json(this.errorResponse(500, "Error updating Message with id=" + id));
			});
	};

	// Delete a Message with the specified id in the request
	delete = async (req: express.Request, res: express.Response) => {
		const id = req.params.id;
		await Message.destroy({
			where: { id: id },
		})
			.then((num) => {
				if (num == 1) {
					return res.json(this.successResponse({}, 200, "Message was deleted successfully!"));
				} else {
					return res.json(this.errorResponse(500, `Cannot delete Message with id=${id}. Maybe Message was not found!`));
				}
			})
			.catch((err) => {
				return res.status(500).json(this.errorResponse(500, `Cannot delete Message with id=${id}`));
			});
	};

	// Delete all Messages from the database.
	deleteAll = async (req: express.Request, res: express.Response) => {
		await Message.destroy({
			where: {},
			truncate: false,
		})
			.then((nums) => {
				return res.json(this.successResponse({}, 200, `${nums} Messages were deleted successfully!`));
			})
			.catch((err) => {
				return res.status(500).json(this.errorResponse(500, err.message || "Some error occurred while removing all mssages."));
			});
	};
}
