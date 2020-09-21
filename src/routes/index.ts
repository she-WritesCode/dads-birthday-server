import messages from "./messages.routes";
import express from "express";

export default function routes(app) {
	// all messages routes
	messages(app);
}
