export default (sequelize, Sequelize) => {
	const Message = sequelize.define("message", {
		from: {
			type: Sequelize.STRING,
		},
		where: {
			type: Sequelize.STRING,
		},
		message: {
			type: Sequelize.BOOLEAN,
		},
	});

	return Message;
};
