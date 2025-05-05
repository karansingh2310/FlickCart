import React from 'react'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
   <div className="flex items-center justify-center gap-2 mb-2 mt-8 pl-4 ">
        <p className="prata-regular text-3xl ">Contact Us</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px] rounded-2xl' src={assets.contact} alt="" /> 
        <div className='flex flex-col justify-center items-start gap-4'>
       <p className="font-semibold text-xl text-gray-600">Our Store</p>
       <p className="text-gray-500">FlickCart Pvt. Ltd.</p>
       <p className="text-gray-500">123 Market Street</p>
       <p className="text-gray-500">New Delhi, India - 110001</p>
       <p className="text-gray-500 pb-6">Email: support@flickcart.com | Phone: +91 98765 43210</p>
     
        <p className='font-semibold text-xl text-gray-600'> Careers at Forever</p>
        <p className="text-gray-500">
  Join a passionate team that's redefining e-commerce. We're always looking for creative, driven individuals to grow with us.
</p>
        <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 rounded-4xl'>Explore Jobs</button>
        </div>
      </div>
      <NewsLetterBox/>
      </div>
  )
}

export default Contact
