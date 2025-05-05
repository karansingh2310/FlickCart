import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Orders = () => {

const {currency,products} = useContext(ShopContext)

  return (
    <div className='border-t pt-6'>
      <div className="text-4xl pb-10 text-center ">
        <h1>My Orders</h1>
      </div>

      <div>
        {
          products.slice(1,4).map((item,index)=>{
          return (
            <div key={index} className='py-4 border-t  text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 pb-2  text-sm'>
                <img src={item.image[0]} className='w-16 sm:w-28'  alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className='text-lg'>{currency}{item.price}</p>
                    <p>Quantity: 1</p>
                  </div>
                  <p className='mt-2'>Date: <span className='text-gary-400'>23 DEC 2024</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                  <div className="flex items-center gap-2">
                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                    <p className='text-sm sm:text-base'>Ready To Ship</p>
                  </div>
                  <button className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>
            </div>
          )
          })
        }
      </div>

    </div>
  )
}

export default Orders
