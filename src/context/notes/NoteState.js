import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "65ae55585d7ab831b41fbff8",
            "user": "65ad0d180fb6dd1c17cfcad6",
            "title": "This is an example title",
            "description": "This is an example description",
            "tag": "This is an example tag",
            "date": "2024-01-22T11:45:28.356Z",
            "__v": 0
        },
        {
            "_id": "65b276f37bfb414fb6096a69",
            "user": "65ad0d180fb6dd1c17cfcad6",
            "title": "This is an example title",
            "description": "This is an example description",
            "tag": "This is an example tag",
            "date": "2024-01-25T14:57:55.403Z",
            "__v": 0
        },
        {
            "_id": "65b27c86bceb464cff760cef",
            "user": "65ad0d180fb6dd1c17cfcad6",
            "title": "This is an example title 1",
            "description": "This is an example description",
            "tag": "This is an example tag",
            "date": "2024-01-25T15:21:42.182Z",
            "__v": 0
        },
        {
            "_id": "65b27c89bceb464cff760cf1",
            "user": "65ad0d180fb6dd1c17cfcad6",
            "title": "This is an example title 2",
            "description": "This is an example description",
            "tag": "This is an example tag",
            "date": "2024-01-25T15:21:45.794Z",
            "__v": 0
        },
        {
            "_id": "65b27c8cbceb464cff760cf3",
            "user": "65ad0d180fb6dd1c17cfcad6",
            "title": "This is an example title 3",
            "description": "This is an example description",
            "tag": "This is an example tag",
            "date": "2024-01-25T15:21:48.132Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial);

    // Add a note 
    const addNote = (title, description, tag) => {
        let note = {
            "title": title,
            "description": description,
            "tag": tag,
        }
        setNotes(notes.concat(note))
    }

    // Delete a note
    const deleteNote = () => {
        console.log();
    }

    // Edit a note
    const editNote = () => {

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;