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
app.get("/api/users", (req, res) => {
    res.send("This is the get users route")
})


app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})

//zeJ1uJnocPr3EUZm
//rohitgalande45
//mongodb+srv://<db_username>:<db_password>@cluster0.bebfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0