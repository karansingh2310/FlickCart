import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import { useState , useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'




const Navbar = () => {

  
  const {search, setSearch, showSearch, setShowSearch,visible,setVisible,getCartCount,navigate,setToken,setCartItems,token} = useContext(ShopContext);
  

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
      document.body.style.backgroundColor = 'white';
    } else {
      document.body.style.overflow = '';
      document.body.style.backgroundColor = '#f5f5f5';
    }
  }, [visible]);

  const logout = () =>{
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (

    <div className='flex items-center justify-between py-5 font-medium relative'>

      <Link to={'./'}>
      <img src={assets.logo} className='w-44' alt="logo" />
      </Link>
      

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

        <NavLink to={'/'} className='flex flex-col items-center gap-1'  >
          <p>HOME</p>
          <hr className='w-1/2 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to={'/collection'} className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-1/2 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to={'/about'} className='flex flex-col items-center gap-1 '  >
          <p>ABOUT</p>
          <hr className='w-1/2 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to={'/contact'} className='flex flex-col items-center gap-1 '  >
          <p>CONTACT</p>
          <hr className='w-1/2 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

      </ul>


      <div className='flex items-center gap-4 '>

      <Link to={'/collection'}>
      <span  className="material-symbols-outlined w-5 cursor-pointer !text-3xl">search</span>
        </Link>

        

        <div className="group relative">
        <span onClick={()=> token ? null : navigate('/login')}  className="material-symbols-outlined !text-4xl cursor-pointer">person</span> 
          {token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-2'>
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
              <p className='cursor-pointer hover:text-black' onClick={logout}>Logout</p>
            </div>
          </div>}
        </div>

        <Link to='/cart' className='relative'>
          
          <span className="material-symbols-outlined !text-3xl ">shopping_bag</span>
          <p className='absolute right-[0px] bottom-1.5 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>

        </Link>

        <div onClick={() => setVisible(true)} className='sm:hidden '>
          <span className="material-symbols-outlined !text-4xl">sort</span>
        </div>


      </div>

      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-{1} ${visible ? 'w-full' : 'hidden'} h-screen`}>

        <div className="flex flex-col text-gray-600 gap-2">

          <div className="flex items-center cursor-pointer py-3">
            <span onClick={() => setVisible(false)} className="material-symbols-outlined">arrow_back_ios</span>
            <p onClick={() => setVisible(false)} className='text-2xl'>Back</p>
          </div>

          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>

        </div>

      </div>
    </div>
  )
}

export default Navbar
