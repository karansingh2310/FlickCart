import React from 'react'

const OurPolicy = () => {

  return (
    <div className='flex  sm:flex-row justify-around gap-12 sm:gap-2 text-center py-10 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <div className='inline-block transform transition-transform duration-800 hover:rotate-180 cursor-pointer'><span className="material-symbols-outlined !text-7xl">sync_alt</span></div>
      <p className='font-semibold'>Easy Exchange Policy</p>
      <p className='text-gray-400'>We Offer hassle free exchange policy</p>
      </div>

      <div>
        <div className='inline-block cursor-pointer'><span className="material-symbols-outlined !text-7xl">verified</span></div>
      <p className='font-semibold'>7 Days Return Policy</p>
      <p className='text-gray-400'>We Provide 7 days free return policy</p>
      </div>

      <div>
        <div className='inline-block cursor-pointer'><span className="material-symbols-outlined !text-7xl">support_agent</span></div>
      <p className='font-semibold'>Best Customer Support</p>
      <p className='text-gray-400'>24x7 Customer Support</p>
      </div>
    </div>
  )
}

export default OurPolicy
