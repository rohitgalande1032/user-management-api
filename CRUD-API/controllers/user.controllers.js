const User = require("../model/user.model")

const postRoute = async (req, res) => {
    try {
        const user = await User.create(req.body)
        console.log(user)
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

const getRoute = async (req, res) => {
    try{
        const users = await User.find({})
        res.status(200).json(users)
    }catch(err) {
        res.status(500).json({message: err.message})
    }
}

const getId = async (req ,res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const putId = async (req, res) => {
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
}

const deleteId = async (req, res) => {
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
}

module.exports = {postRoute, getRoute, getId, putId, deleteId}