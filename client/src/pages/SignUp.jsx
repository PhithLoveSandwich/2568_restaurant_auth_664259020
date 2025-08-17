  import React, { useState } from 'react';
  import AuthServices from '../services/auth_services';
  import { useNavigate } from 'react-router-dom';
  import Swal from 'sweetalert2';

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

    const handleSubmit = async () => {
      try {
        const response = await AuthServices.register(
          user.username,
          user.name,
          user.email,
          user.password
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "User registered successfully!",
            showConfirmButton: false,
            timer: 1500,
          });

          // Reset form
          setUser({
            username: '',
            name: '',
            email: '',
            password: '',
          });

          navigate("/login");
        }
      } catch (error) {
        console.error("Registration error:", error);
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error?.response?.data?.message || error.message,
        });
      }
    };

    return (
      <div className="container mx-auto">
        <div className="flex justify-center items-center min-h-screen bg-base-300">
          <div className="card w-full max-w-md shadow-xl bg-base-100">
            <div className="card-body">
              <h1 className="text-3xl font-bold text-center mb-5">
                Grab Restaurant Register Form
              </h1>

              {["username", "name", "email", "password"].map((field) => (
                <fieldset key={field} className="fieldset mb-4">
                  <legend className="fieldset-legend">{field.charAt(0).toUpperCase() + field.slice(1)}:</legend>
                  <input
                    type={field === "password" ? "password" : "text"}
                    className="input w-full"
                    placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}...`}
                    onChange={handleChange}
                    value={user[field]}
                    name={field}
                    required
                  />
                </fieldset>
              ))}

              <div className="flex justify-center gap-4 mt-4">
                <button
                  className="btn btn-outline btn-primary"
                  onClick={handleSubmit}
                >
                  Register
                </button>
                <a
                  href="/"
                  className="btn btn-outline btn-secondary"
                >
                  Cancel
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default SignUp;
