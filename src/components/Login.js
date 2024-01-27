import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Login() {

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

            console.log(userToken);

            if (userToken.success) {
                localStorage.setItem("auth-token", userToken.authtoken);
                navigate("/");
            }
            else {
                alert("Invalid Credentials")
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
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" onChange={onChange} value={credentials.email} className="form-control" id="email" name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
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
