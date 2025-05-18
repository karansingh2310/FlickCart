import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Add from './pages/Add'
import List from'./pages/List'
import Orders from './pages/Orders'
import { Routes,Route } from 'react-router-dom'
import Login from './components/Login'
import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react'


 export const backendUrl = import.meta.env.VITE_BACKEND_URL
 export const currency = '₹'
const App = () => {

const [token,setToken]= useState(localStorage.getItem('token')?localStorage.getItem('token') : '')

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === '' ? <Login setToken={setToken}/> :
      <>
   <Navbar setToken={setToken} />
   <hr className='border-[0.2px]' />
   <div className='flex w-full'>
     <Sidebar/>
     <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
      <Routes>
        <Route path='/add' element = {<Add/>}/>
        <Route path='/list' element = {<List/>}/>
        <Route path='/Orders' element = {<Orders/>}/>
      </Routes>
     </div>
   </div>
   </>}
    </div>
  )
}

export default App
