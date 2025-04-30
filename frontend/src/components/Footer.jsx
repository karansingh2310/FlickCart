import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
<>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10 my-10 mt-20 text-sm'>

      <div>
        <img src={assets.logo} alt="" className='mb-3 w-42' />
        <p className='text-gray-500 w-full pl-4'> Discover quality products at unbeatable prices. We bring you the latest trends, exclusive deals, and a shopping experience tailored just for you.  From fashion to home essentials, our collections are handpicked to meet your lifestyle. Join thousands of happy customers who trust us for their everyday shopping needs.</p>
      </div>

      <div className='pl-4'>
        <p className='text-3xl font-semibold mb-5'>COMPANY</p>
        <ul className='w-flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
        </ul>
      </div>

      <div className='pl-4'>
        <p className='text-3xl font-semibold mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+1-212-762-8752</li>
            <li>contact@flickcart.com</li>
        </ul>
      </div>

    </div>

    <div className=''>
      <hr/>
      <p className='py-5 text-sm text-center text-gray-500'>&copy; 2024 FlickCart.com - All Rights Reserved.</p>
    </div>

</>
  )
}

export default Footer