import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';


export default function Notes(props) {

    const { showAlert } = props;

    const context = useContext(noteContext);

    const { notes, getAllNotes, editNote } = context;

    const [note, setNote] = useState({ eid: "", etitle: "", edescription: "", etag: "" })

    const ref = useRef(null);
    const refClose = useRef(null);

    useEffect(() => {
        getAllNotes();
    },
        // eslint-disable-next-line
        [])

    const updateNote = (currentNote) => {
        // console.log(currentNote);
        setNote({ eid: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
        ref.current.click();
    }

    const handleOnEditNote = () => {
        // console.log(note);
        editNote(note.eid, note.etitle, note.edescription, note.etag);
        // console.log(refClose.current);
        refClose.current.click();
        showAlert("Updated Successfully", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <>
            <AddNote showAlert={showAlert} />

            {/* <!-- Modal --> */}

            <button type="button" style={{ display: 'none' }} ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" value={note.etitle} className="form-control" id="etitle" name='etitle' minLength={5} required onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" value={note.edescription} className="form-control" id="edescription" name='edescription' minLength={5} required onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" value={note.etag} className="form-control" id="etag" name='etag' minLength={5} required onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 5 && note.edescription.length < 5} className="btn btn-primary" onClick={handleOnEditNote}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row">
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length === 0 && "No notes to display"}
                </div>
                {
                    notes.map((note) => {
                        {
                            return <NoteItem showAlert={showAlert} key={note._id
                            } updateNote={updateNote} note={note} />
                        }
                    })
                }
            </div>
        </>
    )
}
