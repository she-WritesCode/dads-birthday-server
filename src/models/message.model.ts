import { Sequelize } from "sequelize";

export default function messages(sequelize: Sequelize, Sequelize) {
	const Message = sequelize.define("message", {
		name: {
			type: Sequelize.STRING,
		},
		organisation: {
			type: Sequelize.STRING,
		},
		message: {
			type: Sequelize.STRING,
		},
	});

	return Message;
}

export interface MessageParam {
	name: string;
	organization?: string;
	message: string;
}
export interface MessageUpdateParam {
	name?: string;
	organization?: string;
	message: string;
}
