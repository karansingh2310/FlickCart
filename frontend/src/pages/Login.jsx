import React, { useState } from 'react'

const Login = () => {

const [currState, setCurrState] = useState('Sign Up')

const onSubmitHandler = async (e)=>{
e.preventDefault();
}

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currState==='Login' ? '' :  <input type="text" placeholder='Name' className='w-full px-3 py-2 border border-gray-800 ' required />}
      <input type="email" placeholder='Email' className='w-full px-3 py-2 border border-gray-800' required/>
      <input type="password" placeholder='Password' className='w-full px-3 py-2 border border-gray-800' required/>
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p>Forgot Your Password?</p>
        {currState === 'Login' ? <p className="cursor-pointer" onClick={()=>setCurrState('Sign Up')}>Create Account</p> : <p className="cursor-pointer" onClick={()=>setCurrState('Login')}>Login</p> }
        
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currState==='Login' ? 'Sign In' : "Sign Up"}</button>
    </form>
  )
}

export default Login
