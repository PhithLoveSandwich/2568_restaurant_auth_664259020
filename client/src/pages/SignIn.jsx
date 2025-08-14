import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import AuthServices from '../services/auth_services';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    username: '',
    password: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {

    try {
      const currentUser = await AuthServices.login(login.username, login.password);
      if (currentUser.status === 200 && currentUser.data.token) {
        Swal.fire({
          icon: "success",
          title: "User Login",
          text: "Login successful!",
          showConfirmButton: false,
          timer: 1500
        });

        localStorage.setItem("token", currentUser.data.token);
        navigate("/"); 
      }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: error?.response?.data?.message || error.message,
        });
        console.error("Login error:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <Navbar />

      <div className="flex justify-center items-center min-h-screen bg-base-300">
        <div className="card w-full max-w-md shadow-xl bg-base-100">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center mb-5">
              Grab Restaurant LogIn Form
            </h1>

            <fieldset className="fieldset mb-4">
              <legend className="fieldset-legend">Username:</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Username..."
                onChange={handleChange}
                value={login.username}
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
                value={login.password}
                name="password"
              />
            </fieldset>

            <div className="flex justify-center gap-4 mt-4">
              <button
                className="btn btn-outline btn-primary"
                onClick={handleSubmit}
              >
                SignIn
              </button>
              <a
                href="/signup"
                className="btn btn-outline btn-secondary"
              >
                SignUp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
