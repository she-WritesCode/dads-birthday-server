import { validate, Joi } from "express-validation";
import express from "express";
export default class Rules {
	createMessage = (req: express.Request, res: express.Response, next: express.NextFunction) => {
		validate(
			{
				body: Joi.object({
					from: Joi.string().required(),
					where: Joi.string(),
					message: Joi.string().required(),
				}),
			},
			{},
			{}
		);
		next();
	};
	updateMessage = (req: express.Request, res: express.Response, next: express.NextFunction) => {
		validate(
			{
				body: Joi.object({
					from: Joi.string().required(),
					where: Joi.string(),
					message: Joi.string().required(),
				}),
			},
			{},
			{}
		);
		next();
	};
}
