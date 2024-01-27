import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Login(props) {

    const { showAlert } = props;

    const host = "http://localhost:5000";

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${host}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });


            const userToken = await response.json()


            if (userToken.success) {
                localStorage.setItem("auth-token", userToken.authtoken);
                navigate("/");
                showAlert("Logged In Successfully", "success")
            }
            else {
                showAlert("Invalid Credentials", "danger")
            }


        }
        catch (err) {
            console.log("Add note error: ", err);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <h2>Login to continue to iNoteBook</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" onChange={onChange} value={credentials.email} className="form-control" id="email" name='email' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={onChange} value={credentials.password} id="password" name='password' className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
