import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all h-full flex flex-col justify-between">
      <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer h-full flex flex-col">
        
      
        <div className="h-60 md:h-72 lg:h-80 overflow-hidden rounded-t-lg">
          <img
            className="w-full h-full object-contain hover:scale-110 transition-transform duration-300 ease-in-out"
            src={image[0]}
            alt={name}
          />
        </div>

      
        <div className="p-3 flex flex-col justify-between flex-grow bg-gray-100">
          <p className="text-base font-semibold truncate">{name}</p>
          <p className="text-sm font-medium">{currency}{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;