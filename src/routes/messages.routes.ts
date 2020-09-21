import MessageController from "../controllers/message.contoller";
import express from "express";
import Rules from "../rules";
const rules = new Rules();
const router = express.Router();
const messageController = new MessageController();

export default function messages(app) {
	// Create a new Tutorial
	router.post("/", rules.createMessage, messageController.create);

	// Retrieve all Tutorials
	router.get("/", messageController.findAll);

	// Retrieve a single Tutorial with id
	router.get("/:id", messageController.findOne);

	// Update a Tutorial with id
	router.put("/:id", rules.updateMessage, messageController.update);

	// Delete a Tutorial with id
	router.delete("/:id", messageController.delete);

	// Delete all Tutorials
	router.delete("/", messageController.deleteAll);

	app.use("/api/messages", router);
}
