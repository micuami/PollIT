const { Schema, model } = require("../db/connection");

const PollSchema = new Schema({
    email: { type: String, required: true }, 
    question: { type: String, required: true },
    pollType: { type: String, required: true },
    options: [{ type: String, required: true }],
    votes: [{ type: Number, requiered: false }]
});

const Poll = model("Poll", PollSchema);

module.exports = Poll;