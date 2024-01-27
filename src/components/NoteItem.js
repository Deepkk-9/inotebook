import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

export default function NoteItem(porp) {

    const { deleteNote } = useContext(noteContext);

    const { note, updateNote, showAlert } = porp;

    return (
        <div className='col-md-3 my-3'>
            <div className="card" styles="width: 18rem;">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                    <i className="fa-solid fa-trash-can mx-2" style={{ cursor: 'pointer' }}
                        onClick={() => {
                            deleteNote(note._id)
                            showAlert("Note Deleted Successfully", "success")
                        }}>
                    </i>
                    <i className="fa-solid fa-pen-to-square mx-2" style={{ cursor: 'pointer' }} onClick={() => updateNote(note)}></i>
                </div>
            </div>
        </div >
    )
}
