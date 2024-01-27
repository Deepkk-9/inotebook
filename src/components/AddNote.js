import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

export default function AddNote(props) {

    const { showAlert } = props;

    const context = useContext(noteContext);

    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleOnAddNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        showAlert("Note Added Successfully", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" value={note.title} className="form-control" id="title" name='title' minLength={5} required onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" value={note.description} className="form-control" id="description" name='description' minLength={5} required onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" value={note.tag} className="form-control" id="tag" name='tag' minLength={5} required onChange={onChange} />
                </div>
                <button type="submit" disabled={note.title.length < 5 && note.description.length < 5} className="btn btn-primary" onClick={handleOnAddNote}>Add Note</button>
            </form>
        </div>
    )
}
