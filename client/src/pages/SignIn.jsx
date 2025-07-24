import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router';
import Navbar from "../components/Navbar";

const SignIn = () => {
    const [user, setUser] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async () => {
        setError("");
        try {
            const response = await fetch("http://localhost:5000/api/v1/auth/signin", {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (response.ok && data.token) {
                localStorage.setItem("token", data.token);
                alert("Login success!");
                window.location.href = "/";
            } else {
                setError(data.message || "Login failed");
            }
        } catch (error) {
            setError("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
        }
    };

    return (
        <div className="container mx-auto">
            <Navbar />
            <div>
                <h1 className="title justify-center text-3xl text-center m-5 p-5">
                    Grab Restaurant SignIn Form
                </h1>
            </div>
            {error && <div style={{ color: "red", textAlign: "center", marginBottom: 12 }}>{error}</div>}
            <div className='flex flex-center justify-center'>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Username:</legend>
                    <input type="text" className="input flex items-center gap-2 w-2xl" placeholder="Username..." onChange={handleChange} value={user.username} name="username" />
                </fieldset>
            </div>
            <div className='flex flex-center justify-center'>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Password:</legend>
                    <input type="password" className="input flex items-center gap-2 w-2xl" placeholder="Password..." onChange={handleChange} value={user.password} name="password" />
                </fieldset>
            </div>
            <div className="flex flex-center justify-center gap-4 mt-6">
                <a className="btn btn-outline btn-primary" onClick={handleSubmit}>SignIn</a>
                <a href="/signup" className="btn btn-outline btn-secondary">SignUp</a>
            </div>
        </div>
    );
    
}
export default SignIn;