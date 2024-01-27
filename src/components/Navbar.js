import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate()

    let location = useLocation();

    const onLogouthandle = () => {
        localStorage.removeItem("auth-token")
        navigate("/login")
    }

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

                    {localStorage.getItem("auth-token") ?
                        <button className="btn btn-primary mx-2" onClick={onLogouthandle} role="submit">Log Out</button>
                        :
                        <form className="d-flex" role="search">
                            <Link to="/login" className="btn btn-primary mx-2" role="submit">Login</Link>
                            <Link to="/signup" className="btn btn-primary mx-2" role="submit">Sign Up</Link>
                        </form>
                    }
                </div>
            </div>
        </nav >
    )
}
