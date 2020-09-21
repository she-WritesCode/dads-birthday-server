import url from 'url';
const DATABASE_URL = process.env.DATABASE_URL || "mysql://root:@localhost:3306/daddy_birthday";

const db_url = url.parse(DATABASE_URL);
const scheme = db_url.protocol.substr(0, db_url.protocol.length - 1);
const user = db_url.auth.substr(0, db_url.auth.indexOf(":"));
const pass = db_url.auth.substr(db_url.auth.indexOf(":") + 1, db_url.auth.length);
const host = db_url.hostname;
const port = db_url.port;
const db = db_url.path.slice(1);

module.exports = {
	HOST: host,
	USER: user,
	PASSWORD: pass,
    DB: db,
    PORT: port,
    SCHEME: scheme,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};
