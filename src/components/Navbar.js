import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {

    let location = useLocation();
    useEffect(() => {
    }, [location]
    )

    return (
        <nav className="navbar navbar-expand-lg bg-dark bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location === '/' ? "active" : ""}}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location === '/about' ? "active" : ""}}`} to="/about">About</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <Link to="/login" className="btn btn-primary mx-2" role="submit">Login</Link>
                        <Link to="/signup" className="btn btn-primary mx-2" role="submit">Sign Up</Link>
                    </form>
                </div>
            </div>
        </nav>
    )
}
