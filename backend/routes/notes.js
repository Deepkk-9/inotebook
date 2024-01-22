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



router.put("/updatenote/:id", fetchuser,
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



            // Checks if the ID of the note exist or not 
            let note = await Notes.findById(req.params.id)

            if (!note) {
                return res.status(404).send("Not Found")
            }

            // If ID of note exist then checks if the note is of the same user
            if (note.user.toString() !== req.id) {
                return res.status(401).send("Not Allowed")
            }

            const { title, description, tag } = req.body;

            let newNote = {}

            if (title) {
                newNote.title = title;
            }
            if (description) {
                newNote.description = description;
            }
            if (tag) {
                newNote.tag = tag;
            }

            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

            res.send(note)

        }
        catch (err) {
            res.status(500).send("Internal Server Error")
        }

    })



router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {

        // Returns error when the validation fails of express-validator
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() })
        }

        // Checks if the ID of the note exist or not 
        let note = await Notes.findById(req.params.id)

        if (!note) {
            return res.status(404).send("Not Found")
        }

        // If ID of note exist then checks if the note is of the same user
        if (note.user.toString() !== req.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)

        res.json({ "Success": "Note has been deleted", note: note })

    } catch (err) {
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router