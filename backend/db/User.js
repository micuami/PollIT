const {Schema, model} = require("../db/connection") 


const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true}
})


const User = model("User", UserSchema)

module.exports = User