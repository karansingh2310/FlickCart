import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    const tempData = [];

    for (const itemId in cartItems) {
      const item = cartItems[itemId];

      if (typeof item === 'object') {
        for (const size in item) {
          if (item[size] > 0) {
            tempData.push({ _id: itemId, quantity: item[size], size });
          }
        }
      } else {
        if (item > 0) {
          tempData.push({ _id: itemId, quantity: item });
        }
      }
    }

    setCartData(tempData);
  }, [cartItems]);


  return cartData.length > 0 ? (
    <div className='border-t pt-14'>

      <div className='text-3xl mb-3 pl-4'>
        <h1 className='font-bold'>Your Cart</h1>
      </div>

      {
       
        cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id)
          return (
            <div key={index} className='py-4 border-t-[0.5px] border-b-[0.5px]  text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 '>
              <div className="flex sm:justify-between items-center gap-2 ">

                <div className="flex items-center gap-3 mt-2 sm:pl-20">
                  <img className='w-16 sm:w-20' src={productData.image[0] || assets.logo} alt="No image found" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    {productData.category ==='Clothing' && <p className='text-xs text-gray-500'>Size: {item.size}</p>}
                    <p>{currency}{productData.price}</p>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item._id, parseInt(e.target.value) || 0, item.size, productData.category)
                  }
                />              <span onClick={() => updateQuantity(item._id, item.quantity + 1, item.size, productData.category)} className="material-symbols-outlined cursor-pointer select-none">add</span>
                <span onClick={() => updateQuantity(item._id, item.quantity - 1, item.size, productData.category)} className="material-symbols-outlined cursor-pointer select-none">remove</span>

              </div>

              <span onClick={() => updateQuantity(item._id, 0, item.size, productData.category)} className="material-symbols-outlined cursor-pointer ">delete</span>

            </div>
          )
        })
      }

      

      <div className='flex justify-end my-20'>
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>

    </div>
  ) : <div >
    <h1 className=' text-3xl pt-20  pl-4 h- font-bold'>Cart is Empty</h1>
    <div className='flex justify-end my-20'>
      <div className="w-full sm:w-[450px]">
        <CartTotal />
        <div className="w-full text-end">
          <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer'>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  </div>

}

export default Cart
