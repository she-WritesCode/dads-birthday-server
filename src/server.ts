import { ValidationError } from "express-validation";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./models";
import dotenv from "dotenv";
import routes from "./routes";

const app = express();
const http = require("http").createServer(app);
dotenv.config();
// var corsOptions = {
// 	origin: "http://localhost:8081",
// };

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
const PORT = process.env.PORT || 5002;

const closeConnection = () => {
	http.close();
};

process.on("uncaughtException", closeConnection);
process.on("SIGTERM", closeConnection);

(async () => {
	try {
		await db.sequelize.authenticate();
		console.log("Sequelize is Up and Runing.. Move on....");

		await db.sequelize.sync({ force: false, alter: true }).then(() => {
			console.log("Sequelize is ready!");
		});
		if ((await db.messages.count()) < 1) {
			await db.messages.bulkCreate([
				{ name: "busola", organisation: "daugther", message: "i love you daddy" },
				{ name: "oba", organisation: "son", message: "i love you daddy" },
				{ name: "pelumi", organisation: "son", message: "i love you daddy" },
				{ name: "adedapo", organisation: "wife", message: "i love you daddy" },
			]);
		}
	} catch (e) {
		console.log("Sequelize failed to start up", e);
	}

	// listen for requests
	http.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}.`);
	});
})();
