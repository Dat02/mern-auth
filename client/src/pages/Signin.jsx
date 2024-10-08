import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth.jsx';


export default function Signin() {
  const [formData, setFormData] = useState({});
  const {loading , error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange  = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {

    try {
       //prevent refresh page 
      e.preventDefault();
      dispatch(signInStart());

      const res = await fetch('/api/auth/signin',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if(data.success === false){
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));
    }
   
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-9'>
        <input type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' 
        onChange={handleChange}
        />
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' 
        onChange={handleChange}
        />
        <button disabled = {loading} className='bg-green-300 text-white p-3 rounded-lg uppercase font-bold hover:opacity-95 disaibled:opacty-80'> 
        {loading? 'Loading': 'Sign In'} </button>
        <OAuth /> 
      </form>

      <div className='flex gap-2 mt-9'>
        <p>Don't Have an account </p>
        <Link to = '/sign-up'> 
          <span className='text-blue-500'> Sign up</span>        
        </Link>
      </div>

      <p className='text-red-800 mt-5'> {error ? error.message || 'something went wrong': '' } </p>
    </div>
  )
}
