import { ValidationError } from "express-validation";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./models";
import dotenv from "dotenv";
import routes from "./routes";
import { createLogger, format, transports } from "winston";

export const logger = createLogger({
	level: "info",
	format: format.combine(
		format.timestamp({
			format: "YYYY-MM-DD HH:mm:ss",
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
	defaultMeta: { service: "server" },
	transports: [
		//
		// - Write to all logs with level `info` and below to `quick-start-combined.log`.
		// - Write all logs error (and below) to `quick-start-error.log`.
		//
		new transports.File({ filename: "error.log", level: "error" }),
		new transports.File({ filename: "combined.log" }),
	],
});

const app = express();
dotenv.config();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
	if (err instanceof ValidationError) {
		return res.status(err.statusCode).json(err);
	}

	return res.status(500).json(err);
});

routes(app);

// simple route
app.get("/", (req: express.Request, res: express.Response) => {
	res.json({ message: "Welcome to daddy's birthday server." });
});

// set port
const PORT = process.env.PORT || 5052;

(async () => {
	try {
		await db.sequelize.authenticate();
		console.log("Sequelize is Up and Runing.. Move on....");

		await db.sequelize.sync({ force: false, alter: true }).then(() => {
			console.log("Sequelize is ready!");
		});
		// if ((await db.messages.count()) < 1) {
		// 	await db.messages.bulkCreate([
		// 		{ name: "busola", organisation: "daugther", message: "i love you daddy" },
		// 		{ name: "oba", organisation: "son", message: "i love you daddy" },
		// 		{ name: "pelumi", organisation: "son", message: "i love you daddy" },
		// 		{ name: "adedapo", organisation: "wife", message: "i love you daddy" },
		// 	]);
		// }
	} catch (e) {
		console.log("Sequelize failed to start up", e);
	}

	// listen for requests
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}.`);
	});
})();
