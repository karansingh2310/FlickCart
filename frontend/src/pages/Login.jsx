import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import ButtonLoader from '../components/ButtonLoader'

const Login = () => {

const [currState, setCurrState] = useState('Login')
const {token,setToken,navigate,backendUrl,loading,setLoading} = useContext(ShopContext)


const [name,setName] = useState('')
const [password,setPassword] = useState('')
const [email,setEmail] = useState('')



const onSubmitHandler = async (e)=>{
e.preventDefault();
try {
  setLoading(true)
  if(currState === 'Sign Up'){
    const response = await axios.post(backendUrl+ '/api/user/register', {name,email,password})
    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem('token',response.data.token)
    }else{
      toast.error(response.data.message)
    }
  }else{
    const response = await axios.post(backendUrl+ '/api/user/login',{email,password})
    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem('token',response.data.token)
    }else{
      toast.error(response.data.message)
    }
  }
} catch (error) {
  console.log(error)
  toast.error(error.message)
}finally {
  setLoading(false)
}

}

useEffect(()=>{
  if(token){
    navigate('/')
  }
},[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currState==='Login' ? '' :  <input type="text" onChange={(e)=>setName(e.target.value) } value={name} placeholder='Name' className='w-full px-3 py-2 border border-gray-800 ' required />}
      <input onChange={(e)=>setEmail(e.target.value) } value={email} type="email" placeholder='Email' className='w-full px-3 py-2 border border-gray-800' required/>
      <input onChange={(e)=>setPassword(e.target.value) } value={password} type="password" placeholder='Password' className='w-full px-3 py-2 border border-gray-800' required/>
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p>Forgot Your Password?</p>
        {currState === 'Login' ? <p className="cursor-pointer" onClick={()=>setCurrState('Sign Up')}>Create Account</p> : <p className="cursor-pointer" onClick={()=>setCurrState('Login')}>Login</p> }
        
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer'>
  {loading ? <ButtonLoader /> : currState === 'Login' ? 'Log In' : 'Sign Up'}
</button>    </form>
  )
}

export default Login
