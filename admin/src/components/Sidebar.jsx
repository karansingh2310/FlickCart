import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-1'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink to="/add" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2  rounded-l">
        <span className="material-symbols-outlined !text-3xl">add_circle</span>
          <p className='hidden md:block text-xl'>Add items</p>
        </NavLink>

        <NavLink to="/list" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2  rounded-l">
        <span className="material-symbols-outlined !text-3xl">orders</span>
          <p className='hidden md:block text-xl'>List items</p>
        </NavLink>

        <NavLink to="/orders" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2  rounded-l">
        <span className="material-symbols-outlined !text-3xl">orders</span>
          <p className='hidden md:block text-xl'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
