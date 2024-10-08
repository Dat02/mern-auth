import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';


export default function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange  = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {

    try {
       //prevent refresh page 
      setLoading(true);
      setError(false);
      e.preventDefault();
      const res = await fetch('/api/auth/signup',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setLoading(false);
      console.log(data);

      if(data.success === false){
        setError(data.message);
        return;
      }
      
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
   
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-9'>
        <input type="text" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange}
        />
        <input type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' 
        onChange={handleChange}
        />
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' 
        onChange={handleChange}
        />
        <button disabled = {loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase font-bold hover:opacity-95 disaibled:opacty-80'> 
        {loading? 'Loading': 'Sign up'} </button>

        <OAuth />
      </form>

      <div className='flex gap-2 mt-9'>
        <p> Have an account </p>
        <Link to = '/sign-in'> 
          <span className='text-blue-500'> Sign in</span>        
        </Link>
      </div>

      <p className='text-red-800 mt-5'> {error ? error || "Something went wrong" : ''} </p>
    </div>
  )
}
