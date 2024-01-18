var jwt = require('jsonwebtoken');
require('dotenv').config()


const fetchuser = (req, res, next) => {
    //get user from jwt token and add it to the req object.
    const token = req.header('auth-token')
    if (!token) return res.status(401).send({ error: "access denied" })

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.user = data.user
        next();
    } catch (error) {
         res.status(401).send({ error: "access denied" })
    } 

}


module.exports = fetchuser;