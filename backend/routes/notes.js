const express = require('express')
const fetchuser = require('../middleware/Fetchuser')
const router = express.Router()
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')

router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.id })
        res.send(notes)
    }
    catch (err) {
        res.status(500).send("Internal Server Error")
    }
})

router.post("/addnote", fetchuser,
    [
        body('title', "Enter a valid title").isLength({ min: 3 }),
        body('description', "Description must be atleast 5 chracters").isLength({ min: 5 }),
    ],
    async (req, res) => {

        try {

            // Returns error when the validation fails of express-validator
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.status(400).json({ errors: error.array() })
            }

            const { title, description, tag } = req.body;

            const note = new Notes({
                user: req.id, title, description, tag,
            })

            const savedNote = await note.save();

            res.send(savedNote)
        } catch (err) {
            res.status(500).send("Internal Server Error")
        }

    })

module.exports = router