import React from 'react'
import { Link } from 'react-router-dom'

const Title = ({text1, text2}) => {
  return (
    <div className='flex justify-center gap-2 items-center mb-3'>
      <p className='w-full sm:w-full h-[1px] sm:h-[2px] bg-gray-700'></p> 
      <p className='text-shadow text-gray-600 cursor-pointer flex gap-2.5'><span>{text1} </span><span className='text-gray-500 font-medium'>{text2}</span> </p>
      <p className='w-full sm:w-full h-[1px] sm:h-[2px] bg-gray-700'></p>
    </div>
  )
}

export default Title
