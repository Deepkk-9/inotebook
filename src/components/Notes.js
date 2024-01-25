import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';


export default function Notes() {
    const context = useContext(noteContext);

    const { notes, getAllNotes } = context;

    useEffect(() => {
        getAllNotes();
    }, [])

    return (
        <>
            <AddNote />

            <div className="row">
                <h2>Your Notes</h2>
                {
                    notes.map((note) => {
                        {
                            return <NoteItem key={note._id} note={note} />
                        }
                    })
                }
            </div>
        </>
    )
}
