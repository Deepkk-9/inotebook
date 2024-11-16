const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {

    const token = req.header('auth-token');

    if (!token) {
        // Actually checks if the token is send with the header or not
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        // console.log(data.id);
        req.id = data.id;
        next()
    }
    catch (err) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}


module.exports = fetchuser;