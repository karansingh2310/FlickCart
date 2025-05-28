import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const Orders = () => {

const {currency,backendUrl,token} = useContext(ShopContext)
const [orderData,setOrderData] = useState([])

const loadOrderData = async () => {
  try {
    if(!token){
      return null
    }

    const response =  await axios.get(backendUrl+'/api/cart/order/userorders',{headers: {token}})
    console.log(response.data)
   if(response.data.success){
    let allOrdersItems = []
    response.data.orders.map((order)=>{
      order.items.map((item)=>{
        item['amount'] = order.amount
        item['status'] = order.status
        item['payment'] = order.payment
        item['paymentMethod'] = order.paymentMethod
        item['date'] = order.date
        item['a']
        allOrdersItems.push(item)
      })
    })
    setOrderData(allOrdersItems)
   
   }
  } catch (error) {
    console.log(error.message)
  }
}

useEffect(()=>{
loadOrderData()
},[token])

 console.log(orderData)

  return (
    <div className='border-t pt-6'>
      <div className="text-4xl pb-10 text-center ">
        <h1>My Orders</h1>
      </div>

      <div>
        {
          orderData.map((item,index)=>{
          return (
            <div key={index} className='py-4 border-t  text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 pb-2  text-sm'>
                 <img
                src={
                  item.image
                    ? Array.isArray(item.image)
                      ? (item.image[0] || '/placeholder.jpg')
                      : item.image
                    : '/placeholder.jpg'
                }
                className='w-16 sm:w-28'
                alt={item.name || "Product"}
              />
                <div>
                 
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className='text-lg'>{currency}{item.amount}</p>
                    <p>Quantity: {item.quantity}</p>
                    {item.size && <p>Size: {item.size}</p>}
                  </div>
                  <p className='mt-2'>Date: <span className='text-gary-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-2'>Payment: <span className='text-gary-400'>{item.paymentMethod}</span></p>

                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                  <div className="flex items-center gap-2">
                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                    <p className='text-sm sm:text-base'>{item.status}</p>
                  </div>
                  <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer'>Track Order</button>
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
