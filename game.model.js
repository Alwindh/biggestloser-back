const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
	{
		loser: {
			type: String,
			required: true,
		},
		players: {
			type: Array,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
