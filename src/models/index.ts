import { DB, USER, PASSWORD, HOST, dialect as _dialect, pool as _pool, DATABASE_URL } from "../config/db.config.js";
import Message from "./message.model.js";
import { Sequelize } from "sequelize";
const sequelize = new Sequelize(DATABASE_URL, {
	host: HOST,
	dialect: _dialect,
	pool: {
		max: _pool.max,
		min: _pool.min,
		acquire: _pool.acquire,
		idle: _pool.idle,
	},
});

const db = {
	Sequelize,
	sequelize,
	messages: Message(sequelize, Sequelize),
};

export default db;
