import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const host = "https://inotebook-deepkk-9.onrender.com";

    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);



    //Get all notes
    const getAllNotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
            });

            const allnotes = await response.json()

            setNotes(allnotes)
        }
        catch (err) {
            console.log("Get All notes error: ", err);
        }
    }



    // Add a note 
    const addNote = async (title, description, tag) => {

        // console.log(title, description, tag);

        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
                body: JSON.stringify({ title, description, tag }),
            });


            const note = await response.json()
            setNotes(notes.concat(note))
        }
        catch (err) {
            console.log("Add note error: ", err);
        }
    }



    // Delete a note
    const deleteNote = async (id) => {

        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
            });

            const note = await response.json()

            console.log(note);

            const newNotes = notes.filter((note) => { return note._id !== id })
            setNotes(newNotes)
        }
        catch (err) {
            console.log("Delete note error: ", err);
        }
    }




    // Edit a note
    const editNote = async (id, title, description, tag) => {

        // console.log(id, title, description, tag);

        try {

            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
                body: JSON.stringify({ title, description, tag }),
            });

            const data = await response.json()

            console.log(data);

            let newNotes = JSON.parse(JSON.stringify(notes));

            for (let i = 0; i < newNotes.length; i++) {

                if (newNotes[i]._id === id) {
                    newNotes[i].title = title;
                    newNotes[i].description = description;
                    newNotes[i].tag = tag;
                    break;
                }
            }
            setNotes(newNotes)
        }
        catch (err) {
            console.log("Edit note error: ", err);
        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;