const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

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
    password: {
        type : String,
        required : true,
        trim: true,
        minLength: 8,
    },

    role: {
        type : String,
        enum : ["user", "admin"],
        default : "user",
    }
}, {timestamps: true})

//this is to hash the password before saving it to the database
userSchema.pre("save", async function(next){
    //extracting the user information
    const user = this;

    //check if the password has been modified
    if(!user.isModified("password")){
        return next();  
    }
    //hashing the password
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        //assigns the hashed password to the user
        user.password = hashedPassword;
    } catch (error) {
        res.status(400).json({message: error.message})
    }

})

//compare password
userSchema.methods.comparePassword = async function(password){ 
    try {
        return await bcrypt.compare(password, this.password);
        //bcrypt takes the inputted password
        //it encrypts it
        //it compare it with the password in the database
    } catch (error) {
        console.log(error)
    }
}

//this is to save this schema as name "User" in the database
const User = mongoose.model("User", userSchema)

//this is to export the User model
module.exports = User