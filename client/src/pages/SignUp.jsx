import React, {useState} from 'react'
import Navbar from "../components/Navbar";

const SignUp = () => {
    const [user, setUser] = useState({
        username : '',
        name : '',
        email : '',
        password : '',
    });
    const handleChange = (e) =>{
        const { name, value } = e.target;
        setUser({...user , [name]: value});
    };
    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/v1/auth/signup",{
                method: "POST",
                body: JSON.stringify(user),
                headers:
                {
                  "Content-Type" : "application/json"
                }
            });
            if (response.ok){
                alert("User register sucessfully!")
                setUser({
                  username : '',
                  name : '',
                  email : '',
                  password : '',
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="container mx-auto">
        <Navbar />
        <div>
        <h1 className="title justify-center text-3xl text-center m-5 p-5">
          Grab Restaurant Add Form
        </h1>
        </div>
        <div className='flex flex-center justify-center'>
            <fieldset class="fieldset">
            <legend class="fieldset-legend">Username:</legend>
            <input type="text" class="input flex items-center gap-2 w-2xl" placeholder="Username..." onChange={handleChange} value={user.username} name = "username"/>
            </fieldset>
        </div>
        <div className='flex flex-center justify-center'>
            <fieldset class="fieldset">
            <legend class="fieldset-legend">Name:</legend>
            <input type="text" class="input flex items-center gap-2 w-2xl" placeholder="Name..." onChange={handleChange} value={user.name} name = "name"/>
            </fieldset>
        </div>
        <div className='flex flex-center justify-center'>
            <fieldset class="fieldset">
            <legend class="fieldset-legend">Email:</legend>
            <input type="text" class="input flex items-center gap-2 w-2xl" placeholder="Email..." onChange={handleChange} value={user.email} name = "email"/>
            </fieldset>
        </div>
        <div className='flex flex-center justify-center'>
            <fieldset class="fieldset">
            <legend class="fieldset-legend">Password:</legend>
            <input type="text" class="input flex items-center gap-2 w-2xl" placeholder="Password..." onChange={handleChange} value={user.password} name = "password"/>
            </fieldset>
        </div>
      <div className="flex flex-center justify-center gap-4 mt-6">
        <a className="btn btn-outline btn-primary" onClick={handleSubmit}>Register</a>
        <a href="/" className="btn btn-outline btn-secondary">Cancel</a>
      </div>
    </div>
  )
};

export default SignUp;