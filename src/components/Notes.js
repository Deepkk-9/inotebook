import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';

export default function Notes() {
    const context = useContext(noteContext);

    const { notes, setNotes } = context;
    return (
        <div className="container">
            <h2>Your Notes</h2>
            {
                notes.map((note) => {
                    {
                        return (
                            <div>
                                <NoteItem note={note} />
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}
