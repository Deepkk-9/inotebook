import React from 'react'

export default function NoteItem(porp) {

    const { note } = porp;

    return (
        <div>
            <div class="card my-3" styles="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">{note.title}</h5>
                    <p class="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}
