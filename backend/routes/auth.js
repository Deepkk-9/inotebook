const express = require('express')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/Fetchuser')

const JWT_SECRET = "PracticeProject$1"

const router = express.Router()

const User = require("../models/User")

router.post("/createuser",

    //Validating the data we are sending before the request is sent

    [
        body('name', "Enter a valid Name").isLength({ min: 3 }),
        body('email', "Enter a valid Email").isEmail(),
        body('password', "Length of the password should be atleat 5 characters").isLength({ min: 5 }),
    ],

    async (req, res) => {

        // Returns error when the validation fails of express-validator
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() })
        }

        try {

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


router.post("/login",

    //Validation of data fields
    [
        body('email', "Enter a valid Email").isEmail(),
        body('password', "Password cannot be blank").exists(),
    ],

    async (req, res) => {
        // Returns error when the validation fails of express-validator
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() })
        }

        try {

            const { email, password } = req.body;

            const user = await User.findOne({ email });


            if (!user) {
                return res.status(400).json({ error: "Please try to login with correct credentials" })
            }

            // console.log(user.password);

            const checkPass = await bcrypt.compare(password, user.password);

            if (!checkPass) {
                return res.status(400).json({ error: "Please try to login with correct credentials" })
            }

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



router.post("/getuser", fetchuser, async (req, res) => {
    try {
        let userID = req.id;

        const user = await User.findById(userID).select("-password")

        res.send(user)
    }
    catch (err) {
        res.status(500).send("Internal Server Error")
    }
})



module.exports = router