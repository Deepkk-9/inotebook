import React from 'react';
import Notes from './Notes';

export default function Home(props) {

    // console.log(props.showAlert("It works", "success"));
    const { showAlert } = props;

    return (
        <div>
            <Notes showAlert={showAlert} />
        </div>
    )
}
