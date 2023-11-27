const express= require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
db.once('open', () => console.log('Connected to MongoDB'));
const MyModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
const test = new MyModel({name: "name"});
test.save();

app.get("/", (req, resp)=>{
    resp.send("app is working...");
});

app.listen(5000);