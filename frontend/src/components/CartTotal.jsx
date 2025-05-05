import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {

    const {getCartAmount,currency,delivery_fee} = useContext(ShopContext)

  return (

<div className='w-full'>
      <div className="text-2xl">
        <Title text1={'Cart'} text2={'Totals'}/>
      </div>
    <div className="flex flex-col gap-2 mt-2 text-sm">
         <div className="flex justify-between">
            <p className='text-xl'>Subtotal</p>
            <p className='text-xl'>{currency}{getCartAmount()}.00</p>
         </div>
        <hr />
      
      <div className="flex justify-between">
        <p className='text-xl'>Shipping Fee</p>
        <p className='text-xl'>{currency}{delivery_fee}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
        <p className='text-xl'>Total</p>
        <p className='text-xl'>{currency}{getCartAmount() === 0 ? 0 : getCartAmount()+delivery_fee}.00</p>
        </div>
        <hr />

    </div> 
 </div>
  )
}

export default CartTotal
