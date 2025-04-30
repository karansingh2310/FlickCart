import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'



const LatestCollection = () => {

    const { products } = useContext(ShopContext)
    const [latestProduct, setLatestProduct] = useState([])

    useEffect(()=>{
        setLatestProduct(products.slice(0,10));
    },[])


    return (
        <div className='my-7'>
            <div className="text-center py-6 text-3xl">
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Discover the freshest picks of the season with our latest collection. From casual classics to statement pieces, each item is crafted to keep you stylish and comfortable all day long.
                </p>
            </div>
          {/* rendering products */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                latestProduct.map((item,index)=>{
                    return (
                  <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                )
                })
            }
          </div>
        </div>
    )
}

export default LatestCollection
