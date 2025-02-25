const express = require("express")

const app = express()

//Mongoose is the driver that helps us to interact with the database and makes sure that 
//data is properly validated and structured
const mongoose = require("mongoose")
const userRoutes = require("./routes/user.routes.js")
const PORT = 3000
const url = "mongodb+srv://rohitgalande45:zeJ1uJnocPr3EUZm@cluster0.bebfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//it enables the express app to parse the data sent in the request body
app.use(express.json())

mongoose.connect(url)
.then(()=> console.log("Connected to database"))

//routes for user management from the database
app.use("/api/users", userRoutes)

app.get("/", (req, res) => {
    res.send("Hello World!!")
})

//PORT listener -> are where we can deploy our application on local system
app.listen(PORT, ()=> {
    //Handler function -> handles what we are going to do with request
    console.log(`Server is running on port ${PORT}`)
})

//zeJ1uJnocPr3EUZm
//rohitgalande45
//mongodb+srv://<db_username>:<db_password>@cluster0.bebfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0