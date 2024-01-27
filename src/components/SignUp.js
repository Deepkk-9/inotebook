import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const host = "http://localhost:5000";

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${host}/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
            });

            const userToken = await response.json()

            console.log(userToken);

            if (userToken.success) {
                localStorage.setItem("auth-token", userToken.authtoken);
                navigate("/");
            }
            else {
                alert("User Already Exists");
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
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" onChange={onChange} value={credentials.name} className="form-control" id="name" name='name' minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" onChange={onChange} value={credentials.email} className="form-control" id="email" name='email' aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={onChange} value={credentials.password} className="form-control" id="password" name='password' minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Confirm Password</label>
                    <input type="password" onChange={onChange} value={credentials.cpassword} className="form-control" id="cpassword" name='cpassword' minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
