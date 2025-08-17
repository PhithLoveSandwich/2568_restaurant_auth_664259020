import React, { useState } from 'react';
import AuthServices from '../services/auth_services';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const SignIn = () => {
    const navigate = useNavigate();
    const { login } = useAuthContext();

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthServices.login(loginForm.username, loginForm.password);
            if (response.status === 200 && response.data.token) {
                // AuthServices.login already calls TokenServices.setUser(response.data)
                // but we also update context so Navbar reads updated user
                const userToStore = {
                    username: response.data.userinfo?.username || '',
                    name: response.data.userinfo?.name || '',
                    email: response.data.userinfo?.email || '',
                    token: response.data.token,
                };
                login(userToStore);

                Swal.fire({
                    icon: 'success',
                    title: 'Login successful',
                    showConfirmButton: false,
                    timer: 1200,
                });
                navigate('/');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login failed',
                    text: response.data?.message || 'Invalid credentials',
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Login failed',
                text: err?.response?.data?.message || err.message || 'Server error',
            });
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-center items-center min-h-screen bg-base-300">
                <div className="card w-full max-w-md shadow-xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold text-center mb-5">Grab Restaurant LogIn Form</h1>
                        <form onSubmit={handleSubmit}>
                            <fieldset className="fieldset mb-4">
                                <legend className="fieldset-legend">Username:</legend>
                                <input
                                    type="text"
                                    className="input w-full"
                                    placeholder="Username..."
                                    onChange={handleChange}
                                    value={loginForm.username}
                                    name="username"
                                />
                            </fieldset>

                            <fieldset className="fieldset mb-4">
                                <legend className="fieldset-legend">Password:</legend>
                                <input
                                    type="password"
                                    className="input w-full"
                                    placeholder="Password..."
                                    onChange={handleChange}
                                    value={loginForm.password}
                                    name="password"
                                />
                            </fieldset>

                            <div className="flex justify-center gap-4 mt-4">
                                <button type="submit" className="btn btn-outline btn-primary">
                                    SignIn
                                </button>
                                <a href="/signup" className="btn btn-outline btn-secondary">
                                    SignUp
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
