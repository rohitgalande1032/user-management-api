//import necessary modules that we need to implement express JS
const express = require('express');

//this setup express application
const app = express()

app.get("/", (req, res) => {
    res.send("Hello World")
})

//PORT listener -> are where we can deploy our application on local system
app.listen(3000, () => {
    //Handler function -> handles what we are going to do with request
    console.log("server is running on port 3000")
}) 


//powershell -Execution Bypass -command "nodemon script.js"