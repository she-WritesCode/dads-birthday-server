import { validate, Joi } from "express-validation";

export default class Rules {
	createMessage = () => {
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
	};
	updateMessage = () => {
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
	};
}
