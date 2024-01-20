const express = require('express')
const { body, validationResult } = require('express-validator')

const router = express.Router()

const User = require("../models/User")

router.post("/", [
    body('name', "Enter a valid Nname").isLength({ min: 3 }),
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Length of the password should be atleat 5 characters").isLength({ min: 5 }),
], async (req, res) => {

    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() })
        }

        const user = await User.create(req.body)
        console.log(user);
        res.send(req.body)
    }
    catch (err) {
        console.log(err);
        res.json({ error: "Please enter a unique value for email", message: err.message })
    }
})

module.exports = router