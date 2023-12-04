const { Schema, model } = require("../db/connection");

const PollSchema = new Schema({
    email: { type: String, required: true }, 
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    votes: [{ user: { type: String, required: true }, optionIndex: { type: Number, required: true } }]
});

const Poll = model("Poll", PollSchema);

module.exports = Poll;