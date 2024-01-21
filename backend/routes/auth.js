const express = require('express')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = "PracticeProject$1"

const router = express.Router()

const User = require("../models/User")

router.post("/createuser",

    //Validating the data we are sending before the request is sent

    [
        body('name', "Enter a valid Nname").isLength({ min: 3 }),
        body('email', "Enter a valid Email").isEmail(),
        body('password', "Length of the password should be atleat 5 characters").isLength({ min: 5 }),
    ],

    async (req, res) => {

        try {

            // Returns error when the validation fails of express-validator
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.status(400).json({ errors: error.array() })
            }


            //Checks if already a email exists or not
            let user = await User.findOne({ email: req.body.email })

            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exists" })
            }

            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password, salt)

            // User is created here
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })

            const data = {
                id: user.id
            }

            const authToken = jwt.sign(data, JWT_SECRET)

            res.json({ authToken })
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message })
        }
    })

module.exports = router