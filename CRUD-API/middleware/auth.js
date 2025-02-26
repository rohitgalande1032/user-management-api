const jwt = require('jsonwebtoken');


const JWT_SECRET = "this is s secret key that you should not tell anyone about"

//we have return a logic to create a token for a user thatfor the first time visit our API
const generateToken = async (user) => {
    return jwt.sign(user, JWT_SECRET, {expiresIn: '1d'})
}


//this is for the users who ALREADY REGISTERED and need to be AUTHENTICATED
const jwtAuth = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    if(!token) {
        return res.staus(401).json({message: "No Token Provided"})
    }

    try {
        //it verifies the token that comes from the request
        const verifiedToken = await jwt.verify(token, JWT_SECRET)
        //it validate the user
        req.user = verifiedToken
        next()  //it continues with next function
    } catch (error) {
        return res.status(401).json({message: "Invalid Token"})
    }
}

module.exports = {generateToken, jwtAuth}






//jsonwebtoken provides us with 2 important functions
//jwt.sign() -> generate token
//jwt.sign()-> has 3 arguments  ---> payload, secret key, options