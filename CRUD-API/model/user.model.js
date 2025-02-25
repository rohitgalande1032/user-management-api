const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, //mandatory or not
        unique: true, //unique or not
        caseSensitive: false, //case sensitive or not
        trim: true,
        minLength: 5,
        maxLength: 20
    },  

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /.+\@.+\..+/, 
    },
    role: {
        type : String,
        enum : ["user", "admin"],
        default : "user",
    }
}, {timestamps: true})

//this is to save this schema as name "User" in the database
const User = mongoose.model("User", userSchema)

//this is to export the User model
module.exports = User