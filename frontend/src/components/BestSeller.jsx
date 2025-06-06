import React, { useEffect, useState,useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {

    const {products} = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])



    useEffect(()=>{
      const bestProduct = products.filter((item)=>item.bestseller)
      setBestSeller(bestProduct.slice(0,5))
    },[products])



  

  return (
    <div className='my-7'>
      <div className="text-center text-3xl py-6">
        <Title text1 = {'BEST'} text2 = {'SELLER'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
         Discover our most-loved products that customers just can’t get enough of. These top picks are flying off the shelves for a reason — trusted by many, loved by all. Grab yours before they’re gone!</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                bestSeller.map((item,index)=>{
                    return (
                  <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                )
                })
            }
          </div>
    </div>
  )
}

export default BestSeller
