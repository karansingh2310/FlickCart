import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler = (event) => {
       event.preventDefault()
    }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe Now & get 20% Off</p>
        <p className='text-gray-500 mt-3 text-lg'>Stay updated with our latest collections, exclusive deals, and special discounts. Sign up now and enjoy 20% off your first purchase — straight to your inbox!</p>
         <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type="text" placeholder='Enter Your Email' name='email' required />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4 '>SUBSCRIBE</button>
         </form>
    </div>
  )
}

export default NewsLetterBox
