import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000";

    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);



    //Get all notes
    const getAllNotes = async () => {
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



    // Add a note 
    const addNote = async (title, description, tag) => {

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWQwZDE4MGZiNmRkMWMxN2NmY2FkNiIsImlhdCI6MTcwNTg3NDM2NH0.nppXI_JBi4J0NZ-fR40TBlNSdynNfWWT4W_4IvZgpGw"
            },
            body: JSON.stringify({ "title": title, "description": description, "tag": tag }),
        });

        const data = await response.json()

        console.log(data);

        let note = {
            "title": title,
            "description": description,
            "tag": tag,
        }
        setNotes(notes.concat(note))
    }

    // Delete a note
    const deleteNote = async (id) => {

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

    // Edit a note
    const editNote = async (id, title, description, tag) => {

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWQwZDE4MGZiNmRkMWMxN2NmY2FkNiIsImlhdCI6MTcwNTg3NDM2NH0.nppXI_JBi4J0NZ-fR40TBlNSdynNfWWT4W_4IvZgpGw"
            },
            body: JSON.stringify({ title, description, tag }),
        });

        const data = await response.json()

        console.log(data);

        for (let i = 0; i < notes.length; i++) {
            const element = notes[i];

            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;