const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    email: String,
    username: String, 
    password: String,
    resetCode: String,
    resetCodeExpires: Date
})
const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel