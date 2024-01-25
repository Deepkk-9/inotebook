import React from 'react'

export default function Alert(props) {
    return (
        <div class="alert alert-danger" role="alert">
            {props.message}
        </div>

    )
}
