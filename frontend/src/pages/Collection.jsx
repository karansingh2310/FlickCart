import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const { products, search, showSearch, visible } = useContext(ShopContext)
  const [filterProducts, setFilterProducts] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [price, setPrice] = useState([])
  const [selectedVal, setSelectedVal] = useState("relevant");

  const subCategoryOptions = {
    Clothing: ["Men's Wear", "Women's Wear", "Kid's Wear", "Ethnic Wear"],
    Accessories: ["Watches", "Sunglasses", "Bags & Wallets", "Belts"],
    Electronics: ["Mobile Phone", "Laptops", "Tablets", "Headphones"],
    Furniture: ["Sofas", "Beds", "Tables & Desks", "Chairs"],
    Appliances: ["Refrigerators", "Washing Machines", "Air Conditioners", "Microwave Ovens"],
    PersonalCare: ["Hair Care", "Skin Care", "Grooming Devices", "Oral Care"],
    Travel: ["Luggage & Suitcases", "Travel Accessories", "Travel Pillows", "Passport Holders"],
    Sports: ["Cricket", "Football", "Fitness Equipment", "Outdoor Gear"]
  };

  const toggleCategory = (e) => {
    const selected = e.target.value;
    setSelectedVal("relevant");
    setSubCategory('');
  
    if (category === selected) {
      setCategory('');
      
    } else {
      setCategory(selected);
    }
  };

  const toggleSubCategory = (e) => {
    const selected = e.target.value;
    setSelectedVal("relevant");
  
    if (subCategory === selected) {
      setSubCategory('');
    } else {
      setSubCategory(selected);
    }
  };
  const togglePrice = (e) => {

    setSelectedVal("relevant")


    if (price.includes(e.target.value)) {
      setPrice(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setPrice(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = [...products]

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category) {
      productsCopy = productsCopy.filter(item => item.category === category);
    }

  
   
    if (subCategory) {
  
        productsCopy = productsCopy.filter(item => {
        return item.subCategory?.toLowerCase().trim() === subCategory.toLowerCase().trim();
      });
    }

    if (price.length > 0) {
      productsCopy = productsCopy.filter(item => {
        return price.some(val => {

          if (val === "0") {
            return item.price >= 0 && item.price <= 499;
          } else if (val === "500") {
            return item.price >= 500 && item.price <= 1999;
          } else if (val === "2000") {
            return item.price >= 2000 && item.price <= 4999;
          } else if (val === '5000') {
            return item.price >= 5000 && item.price <= 7499;
          } else {
            return item.price >= 7500;
          }
        });
      });
    }
    setFilterProducts(productsCopy)

  }

  const sortProduct = (e) => {
    const selectedValue = e.target.value
    let filterCopy = [...filterProducts]
    if (selectedValue === 'relevant') {
      setSelectedVal(selectedValue)
      setFilterProducts(filterCopy)
    } else if (selectedValue === 'low') {
      setSelectedVal(selectedValue)
      filterCopy = filterCopy.sort((a, b) => a.price - b.price)
    } else {
      setSelectedVal(selectedValue)
      filterCopy = filterCopy.sort((a, b) => b.price - a.price)
    }


    setFilterProducts(filterCopy)

  }



  useEffect(() => {
    applyFilter()
  }, [category, price, search, showSearch, products,subCategory])

  return (
    <div className='flex flex-col sm:flex-row gap1 sm:gap-10 pt-10 border-t '>

      <div className="min-w-60 pl-4">
        <div className='my-2 text-xl flex items-center cursor-pointer '>FILTERS <p onClick={() => setShowFilter(!showFilter)} className={`sm:rotate-270 sm:hidden relative top-[1px] ${showFilter ? "rotate-360" : 'rotate-270'} ${visible ? "hidden" : ""}`}><span className="material-symbols-outlined !text-3xl  ">keyboard_arrow_down</span></p></div>


        <div className={`border border-gray-300 pl-5 py-3 mt-4 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className='flex gap-2'>
              <input
                className='w-3'
                type="checkbox"
                value="Accessories"
                onChange={toggleCategory}
                checked={category === 'Accessories'}
              /> Accessories
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type="checkbox"
                value="Electronics"
                onChange={toggleCategory}
                checked={category === 'Electronics'}
              /> Electronics
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type="checkbox"
                value="Appliances"
                onChange={toggleCategory}
                checked={category === 'Appliances'}
              /> Appliances
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type="checkbox"
                value="Personal Care"
                onChange={toggleCategory}
                checked={category === 'Personal Care'}
              /> Personal Care
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type="checkbox"
                value="Travel"
                onChange={toggleCategory}
                checked={category === 'Travel'}
              /> Travel
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type="checkbox"
                value="Furniture"
                onChange={toggleCategory}
                checked={category === 'Furniture'}
              /> Furniture
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type="checkbox"
                value="Sports"
                onChange={toggleCategory}
                checked={category === 'Sports'}
              /> Sports
            </p>
            <p className='flex gap-2'>
              <input
                className='w-3'
                type="checkbox"
                value="Clothing"
                onChange={toggleCategory}
                checked={category === 'Clothing'}
              /> Clothing
            </p>
          </div>
        </div>

        {category && (
  <div className={`border border-gray-300 pl-5 py-3 mt-4 gap-2 flex-col ${showFilter ? 'flex' : 'hidden'} sm:flex`}>
    {subCategoryOptions[category.replace(" ", "")] && (
      <div>
        <p className='mb-3 text-sm font-medium'>Explore</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
          {subCategoryOptions[category.replace(" ", "")].map((option, index) => (
            <p className='flex gap-2' key={index}>
              <input
                className='w-3'
                type="checkbox"
                value={option}
                onChange={toggleSubCategory}
                checked={subCategory === option}
              /> {option}
            </p>
          ))}
        </div>
      </div>
    )}
  </div>
)}

         

        <div className={`border border-gray-300 pl-5 py-3 mt-4 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Price</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value="0" onChange={togglePrice} /> 0-499
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value="500" onChange={togglePrice} /> 500-1999
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value='2000' onChange={togglePrice} /> 2000-4999
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value='5000' onChange={togglePrice} /> 5000-7499
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value='7500' onChange={togglePrice} /> 7500+
            </p>
          </div>
        </div>

      </div>


      <div className="flex-1 pt-2">
        <div className="flex justify-between text-base sm:text-2xl mb-4 ">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />

          <select onChange={sortProduct} className='border-2 border-gray-500 text-sm p-2 ' value={selectedVal}>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low">Sort by: Low to High</option>
            <option value="high">Sort by: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((item, index) => {
            return (
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />)
          })}
        </div>
      </div>

    </div>
  )
}

export default Collection
