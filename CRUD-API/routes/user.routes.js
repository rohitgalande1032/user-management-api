const express = require('express');
const router = express.Router()
//destructure the controllers from the controllers file
const { getRoute, postRoute, getId, putId, deleteId } =  require('../controllers/user.controllers');


//post users route
router.post("/", postRoute) 

//get users route
router.get("/", getRoute)

//dynamic routing
//querying
//query parameter are used to filter the data

router.get("/:id", getId)

//Update the user
router.put("/:id", putId)

//delete the user
router.delete("/:id", deleteId)

module.exports = router