const express = require('express')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/Fetchuser')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET;

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

            let success;

            //Checks if already a email exists or not
            let user = await User.findOne({ email: req.body.email })

            if (user) {
                success = false;
                return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
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
                id: user._id
            }

            const authToken = jwt.sign(data, JWT_SECRET)
            success = true;

            res.json({ success, authToken })
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

            let success;

            const { email, password } = req.body;

            const user = await User.findOne({ email });


            if (!user) {
                success = false;
                return res.status(400).json({ success, error: "Please try to login with correct credentials" })
            }

            // console.log(user.password);

            const checkPass = await bcrypt.compare(password, user.password);

            if (!checkPass) {
                success = false;
                return res.status(400).json({ success, error: "Please try to login with correct credentials" })
            }

            const data = {
                id: user.id
            }

            const authToken = jwt.sign(data, JWT_SECRET)

            success = true;

            res.json({ success, authtoken: authToken })
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