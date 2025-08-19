import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import AuthServices from '../services/auth_services';
const SignUp = () => {
     const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthServices.register(
        user.username,
        user.name,
        user.email,
        user.password
      );
      if (response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Register Success",
          text: "Your account has been created successfully!",
          showConfirmButton: true
        });
        setUser({
          username: '',
          name: '',
          email: '',
          password: '',
        });
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Register Failed",
        text: error?.response?.data?.message || error.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="container mx-auto">
      <Navbar />
      <div>
        <h1 className="title justify-center text-3xl text-center m-5 p-5">
          Grab Restaurant Register Form
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-center justify-center'>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Username:</legend>
            <input type="text" className="input flex items-center gap-2 w-2xl" placeholder="Username..." onChange={handleChange} value={user.username} name="username" />
          </fieldset>
        </div>
        <div className='flex flex-center justify-center'>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Name:</legend>
            <input type="text" className="input flex items-center gap-2 w-2xl" placeholder="Name..." onChange={handleChange} value={user.name} name="name" />
          </fieldset>
        </div>
        <div className='flex flex-center justify-center'>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email:</legend>
            <input type="text" className="input flex items-center gap-2 w-2xl" placeholder="Email..." onChange={handleChange} value={user.email} name="email" />
          </fieldset>
        </div>
        <div className='flex flex-center justify-center'>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password:</legend>
            <input type="password" className="input flex items-center gap-2 w-2xl" placeholder="Password..." onChange={handleChange} value={user.password} name="password" />
          </fieldset>
        </div>
        <div className="flex flex-center justify-center gap-4 mt-6">
          <button type="submit" className="btn btn-outline btn-primary">Register</button>
          <button type="button" className="btn btn-outline btn-secondary" onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}


export default SignUp;