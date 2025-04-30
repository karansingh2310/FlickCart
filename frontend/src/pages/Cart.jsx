import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Cart = () => {

  const {products,currency,cartItems,updateQuantity} = useContext(ShopContext)
  const [cartData,setCartData] = useState([])

  useEffect(()=>{
   const tempDta = [];
   for(const items in cartItems){
    if(cartItems[items]>0){
      tempDta.push({_id: items, quantity: cartItems[items]})
    }
   }
   setCartData(tempDta)
  },[cartItems])


  return cartData.length > 0 ?  (
    <div className='border-t pt-14'>

      <div className='text-3xl mb-3 pl-4'>
     <h1 className='font-bold'>Your Cart</h1>
      </div>

      {
        cartData.map((item,index)=>{
          const productData = products.find((product)=> product._id === item._id);
          return(
            <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 '>
              <div className="flex justify-between items-center gap-2">
            
                  <div className="flex items-center gap-3 mt-2 pl-20">
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                <p>{currency}{productData.price}</p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
              <input onChange={() => updateQuantity(item._id,item.quantity )} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' value={item.quantity} />
              <span onClick={()=>updateQuantity(item._id,item.quantity+1)} className="material-symbols-outlined cursor-pointer select-none">add</span>
              <span onClick={()=>updateQuantity(item._id,item.quantity-1)} className="material-symbols-outlined cursor-pointer select-none">remove</span>

              </div>
              
              <span onClick={()=>updateQuantity(item._id,0)} className="material-symbols-outlined cursor-pointer ">delete</span>
              
            </div>
          )
        })
      }
      
    </div>
  ) :   <div >
   <h1 className=' text-3xl pt-20 sm:pb-60 pl-4 h- font-bold'>Cart is Empty</h1>
  </div>
}

export default Cart
