import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { backendUrl,currency } from '../App'
import {toast} from 'react-toastify'

const token = localStorage.getItem("token");

const List = () => {
  const [list, setList] = useState([])

  const fetchList = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/product/list')
        if(response.data.success){
          setList(response.data.products)
        }
        else{
         toast.error(response.data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
  }

  const removeProduct = async (id)=>{
    try {
      const response = await axios.post(backendUrl+ '/api/product/remove',{id},{
        headers: {
          Authorization: `Bearer ${token}`,
           }
       
      })

      if(response.data.success){
        toast.success(response.data.message)
        await fetchList();
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
     fetchList()
  },[list])
  return (
    <>
      <p className='mb-4 text-2xl'>All Products List</p>
      <div className='flex flex-col gap-1'>

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 border bg-gray-100 text-sm '>
          <strong>Image</strong>
          <strong>Name</strong>
          <strong>Category</strong>
          <strong>Price</strong>
          <strong className='text-center'>Action</strong>
        </div>

        {
          list.map((item,index)=> (
             <div className='grid grid-cols-[1fr_3_fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
              <img className='w-20 h-20 object-contain' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
             </div>
          ))
        }
      </div>
    </>
  )
}

export default List
