// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Game = require("./game.model");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 1824;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => {
		console.error("MongoDB connection error:", err);
		process.exit(1); // Exit the application with an error code
	});

// Simple route
app.get("/api/healthz", (req, res) => {
	res.send("Hello World!");
});

app.get("/api/game/get/all", async (req, res) => {
	try {
		const games = await Game.find();
		res.json(games);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.post("/api/game/add", async (req, res) => {
	const { loser, players } = req.body;

	if (!loser || !players) {
		return res.status(400).json({ message: "Missing required fields" });
	}

	try {
		const newGame = new Game({
			loser,
			players,
		});

		const savedGame = await newGame.save();
		res.json(savedGame);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Start server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
