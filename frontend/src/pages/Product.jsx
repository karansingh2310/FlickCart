import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, navigate } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');

  const [selectedSize, setSelectedSize] = useState('');

  const handleSizeClick = (size) => {
    setSelectedSize(size === selectedSize ? '' : size); 
  };

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
      }
      return null;
    });
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo(0, 0)
  }, [productId, products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row w-full h-full'>
        <div className='flex flex-col-reverse gap-3 sm:flex-row sm:w-[60%]'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[20%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 h-40 object-fit flex-shrink-0 cursor-pointer rounded-2xl"
              />
            ))}
          </div>
          <div className='w-full h-auto sm:w-[80%]'>
            <img src={image} className='w-full max-h-[700px] object-cover rounded-2xl' alt="" />
          </div>
        </div>

        <div className='flex-1'>
          <h1 className='font-medium text-3xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star} alt="" className="w-3" />
            <img src={assets.star} alt="" className="w-3" />
            <img src={assets.star} alt="" className="w-3" />
            <img src={assets.star} alt="" className="w-3" />
            <img src={assets.star_dull} alt="" className="w-3" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className="mt-5 text-xl font-medium">Brand:<span className="font-normal ml-1">{productData.brand}</span></p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-2'></div>
          <p className='font-medium text-xl'>Features</p>
          <div className='flex gap-2'>
            {productData.features.map((item, index) => (
              <button className={"border py-2 px-4"} key={index}>{item}</button>
            ))}
          </div>

          {productData.category?.toLowerCase() === 'clothing' && Array.isArray(productData.sizes) && (
            <>
              <p className='font-medium text-xl mt-5'>Select Size</p>
              <div className='flex gap-2 mt-2 flex-wrap'>
                {productData.sizes.map((size) => (
                 <button
                 key={size}
                 onClick={() => handleSizeClick(size)}
                 className={`border py-2 px-4 rounded ${
                   selectedSize === size ? 'bg-black text-white' : 'bg-white text-black'
                 }`}
               >
                 {size}
               </button>
                ))}
              </div>
            </>
          )}

          <p className="mt-5 text-xl font-medium">Stock Available:<span className="font-normal ml-1">{productData.stock}</span></p>

          <div className='flex gap-2'>
            <button
              onClick={() => {
                if (productData.category.toLowerCase() === 'clothing' && selectedSize.length === 0) {
                  toast.error("Please select a size");
                } else {
                  addToCart(productData._id, selectedSize, productData.category);
                }
              }}
              className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 my-4 cursor-pointer'>
              ADD TO CART
            </button>
            <button onClick={() => navigate('/cart')} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 my-4 cursor-pointer'>
              PROCEED TO CART
            </button>
          </div>

          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product.</p>
            <p>Cash on Delivery is available on this product.</p>
            <p>Easy Return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex gap-2 my-2">
          <button className="border px-5 py-3 text-sm cursor-pointer">Description</button>
          <button className="border px-5 py-3 text-sm cursor-pointer">Reviews (122)</button>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-700">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut enim at eros tempor maximus. Nunc ac orci ut nunc pharetra luctus. Nullam tristique vestibulum dolor non varius. Integer auctor nec libero nec dapibus. Phasellus vehicula neque ut ex mollis, id consequat turpis auctor. Fusce non libero vitae lectus pretium auctor.
          </p>
          <p>
            <strong>Reviews (122)</strong>
            <br />
            ★★★★☆ (4.5/5) - "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac dolor at arcu tincidunt tincidunt."
            <br />
            ★★★☆☆ (3/5) - "Vivamus vulputate metus sit amet justo vehicula, a tincidunt libero tempus. Sed ac lorem a purus lobortis feugiat."
          </p>
        </div>
      </div>

      {/* related products */}
      <RelatedProducts  category={productData.category} subCategory={productData.subcategory} />
    </div>
  ) : <div className='opacity-0'></div>;
};

export default Product;