const express = require("express")

const app = express()

//Mongoose is the driver that helps us to interact with the database and makes sure that 
//data is properly validated and structured
const mongoose = require("mongoose")
const User = require("./model/user.model")
const PORT = 3000
const url = "mongodb+srv://rohitgalande45:zeJ1uJnocPr3EUZm@cluster0.bebfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//it enables the express app to parse the data sent in the request body
app.use(express.json())

mongoose.connect(url)
.then(()=> console.log("Connected to database"))

app.get("/", (req, res) => {
    res.send("Hello World!!")
})

//post users route
app.post("/api/users", async (req, res) => {
    try {
        const user = await User.create(req.body)
        console.log(user)
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

//get users route
app.get("/api/users", async (req, res) => {
    try{
        const users = await User.find()
        res.status(200).json(users)
    }catch(err) {
        res.status(500).json({message: err.message})
    }
})

//dynamic routing
//querying
//query parameter are used to filter the data

app.get("/api/users/:id", async (req ,res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Update the user
app.put("/api/users/:id", async (req, res) => {
    try {
        const {id} = req.params
        //serve first find the user based on the id
        //update necessary information after extracting it from body
        const user = await User.findByIdAndUpdate(id, req.body)

        //if user not found handle this error
        if(!user) {
            return res.status(404).json({message: "User not found"})
        }

        //this is to confirm if the changes have been implemented or not
        const updatedUser = await User.findById(req.params.id);
        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(500).json({message: err.message})
    }
})


//delete the user
app.delete("/api/users/:id", async (req, res) => {
    try {
        const {id} = req.params
        //delete the user based on the id
        const user = await User.findByIdAndDelete(id)
        
        if(!user) {
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json(user)
        res.status(200).json({"message" : "User deleted successfully!!"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})

//zeJ1uJnocPr3EUZm
//rohitgalande45
//mongodb+srv://<db_username>:<db_password>@cluster0.bebfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0