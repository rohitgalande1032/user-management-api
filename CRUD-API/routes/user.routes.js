const express = require('express');
const router = express.Router()
//destructure the controllers from the controllers file
const { getRoute, postRoute, getId, putId, deleteId } =  require('../controllers/user.controllers');
const User = require('../model/user.model');
const { jwtAuth, generateToken } = require('../middleware/auth');


//signup page
//post users route
router.post("/signup", postRoute) 

//login route
router.post("/login", async (req, res)=> {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username: username})

        if(!user) {
            return res.status(400).json({message: "User dosent exist"})
        }

        //chaeck the password from bcrypt
        const isPasswordValid = await user.comparePassword(password);

        if(!isPasswordValid) {
            return res.status(401).json({message: "Invalid password"});
        }
        
        const payload = {
            username: user.username,
        }

        const token = await generateToken(payload)
        res.status(200).json({user: user, token: token})
        // res.status(200).json("Successfully logged In...")
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//get users route
router.get("/", jwtAuth, getRoute)

//dynamic routing
//querying
//query parameter are used to filter the data

router.get("/:id", getId)

//Update the user
router.put("/:id", putId)

//delete the user
router.delete("/:id", deleteId)

module.exports = router