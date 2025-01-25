import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({name: "",email: "",password: "",});

  const nav = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData , [e.target.name]:e.target.value})
  };

  const getUsers = async() => {
    let req = await fetch("http://localhost:3000/users");
    let users = await req.json();
    if (users) {
      // console.log(users);
    }
  };

  useEffect(() => {
    getUsers();
}, [])

  const handleSubmit = async(e) => {
    e.preventDefault();
    let req = await fetch("http://localhost:3000/users");
    let users = await req.json();
    console.log(users)
    let index = users.findIndex(e => e.email === formData.email);
        console.log(index);
    if (index === -1) {
      console.log("Form submitted:", formData);
      await fetch("http://localhost:3000/users" , {method: "POST" , headers: {"Content-Type":"application/json"}, body: JSON.stringify({...formData })});
      getUsers();
      setFormData({name: "",email: "",password: "",});
      toast.success("User registered");
      setTimeout(() => {
        nav("/");
      }, 2000);
    }else{
      toast.error("User with this email already exist");
    }
  };

  return (
    <>
        <ToastContainer position="top-right" autoClose={1900} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        <div className="fixed top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="flex justify-center items-center min-h-screen ">
        <form onSubmit={handleSubmit} className="p-8 rounded-xl w-full max-w-md container backdrop-blur-sm shadow-2xl shadow-slate-800 border-2 border-slate-300 ">
            <h2 className="text-2xl font-bold mb-6 text-slate-100 text-center">Sign Up</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-slate-100 font-medium mb-2">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your name" required/>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-slate-100 font-medium mb-2">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" required/>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-slate-100 font-medium mb-2">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password" required/>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Sign Up
            </button>
            <p className="mt-4 text-sm text-gray-600 text-center">Already have an account?
              <Link to="/login" className="text-blue-500 hover:underline">Log In</Link>
            </p>
        </form>
        </div>
    </>
  );
};

export default SignUp;
