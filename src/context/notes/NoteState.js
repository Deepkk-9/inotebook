import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000";

    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);



    //Get all notes
    const getAllNotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWQwZDE4MGZiNmRkMWMxN2NmY2FkNiIsImlhdCI6MTcwNTg3NDM2NH0.nppXI_JBi4J0NZ-fR40TBlNSdynNfWWT4W_4IvZgpGw"
                },
            });

            const data = await response.json()

            setNotes(data)
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
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWQwZDE4MGZiNmRkMWMxN2NmY2FkNiIsImlhdCI6MTcwNTg3NDM2NH0.nppXI_JBi4J0NZ-fR40TBlNSdynNfWWT4W_4IvZgpGw"
                },
                body: JSON.stringify({ title, description, tag }),
            });


            const data = await response.json()

            console.log(data);
            setNotes(notes.concat(data))
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
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWQwZDE4MGZiNmRkMWMxN2NmY2FkNiIsImlhdCI6MTcwNTg3NDM2NH0.nppXI_JBi4J0NZ-fR40TBlNSdynNfWWT4W_4IvZgpGw"
                },
            });

            const data = await response.json()

            console.log(data);

            console.log("Note deleted id : " + id);
            const newNotes = notes.filter((note) => { return note._id !== id })
            setNotes(newNotes)
            console.log(newNotes);
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
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWQwZDE4MGZiNmRkMWMxN2NmY2FkNiIsImlhdCI6MTcwNTg3NDM2NH0.nppXI_JBi4J0NZ-fR40TBlNSdynNfWWT4W_4IvZgpGw"
                },
                body: JSON.stringify({ title, description, tag }),
            });

            const data = await response.json()

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