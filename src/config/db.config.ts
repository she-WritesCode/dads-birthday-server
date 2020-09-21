const url = require("url");
export const DATABASE_URL = process.env.DATABASE_URL || process.env.CLEARDB_DATABASE_URL || "mysql://root:@localhost:3306/daddy_birthday";

export const db_url = url.parse(DATABASE_URL);
export const dialect = db_url.protocol.substr(0, db_url.protocol.length - 1);
export const USER = db_url.auth.substr(0, db_url.auth.indexOf(":"));
export const PASSWORD = db_url.auth.substr(db_url.auth.indexOf(":") + 1, db_url.auth.length);
export const HOST = db_url.hostname;
export const PORT = db_url.port;
export const DB = db_url.path.slice(1);
export const pool = {
	max: 5,
	min: 0,
	acquire: 30000,
	idle: 10000,
};
