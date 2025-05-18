import React from "react";
import { assets } from "../assets/assets";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from 'react-toastify'
import axios from 'axios'
import { backendUrl } from '../App'
import ButtonLoader from "../components/ButtonLoader";



const token = localStorage.getItem("token");
console.log('Token:', token);

const Add = () => {
  const [loading, setLoading] = useState(false);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Clothing");
  const [bestseller, setBestSeller] = useState(false);
  const [subCategory, setSubCategory] = useState("Men's Wear");
  const [sizes, setSizes] = useState([]);
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('')
  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState([]);

  const addFeature = (e) => {
    
  if (featureInput.trim() == "") {
    toast.error('Enter Feature to Add')
  }else{
    setFeatures([...features, featureInput.trim()]);
    setFeatureInput("");
  }
  };
 

  const removeFeature  = (index) =>{
    const newFeatures = features.filter((_,i) => i !== index);
    setFeatures(newFeatures);
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      if (category === 'Clothing') {
        if (sizes && sizes.length > 0) {
          formData.append("sizes", JSON.stringify(sizes));
        } 
       else {
        formData.append("sizes", ""); 
      }}
      formData.append('brand', brand)
      formData.append('stock', stock)
      formData.append('features', JSON.stringify(features))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)


      const response = await axios.post(
        backendUrl + '/api/product/add',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if(response.data.success){
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setBestSeller(false)
        setSizes([])
        setFeatures([])
        setBrand('')
        setStock('')
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.error('Error in product submission:', error);
toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">

      <div>
        <p className="mb-2 ">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            {!image1 ? <span className="material-symbols-outlined  !text-8xl">
              image_arrow_up
            </span> : <img src={URL.createObjectURL(image1)} className="w-30 h-30" />}
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            {!image2 ? <span className="material-symbols-outlined  !text-8xl">
              image_arrow_up
            </span> : <img src={URL.createObjectURL(image2)} className="w-30 h-30" />}
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            {!image3 ? <span className="material-symbols-outlined  !text-8xl">
              image_arrow_up
            </span> : <img src={URL.createObjectURL(image3)} className="w-30 h-30" />}
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            {!image4 ? <span className="material-symbols-outlined  !text-8xl">
              image_arrow_up
            </span> : <img src={URL.createObjectURL(image4)} className="w-30 h-30" />}
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type Here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write Content Here"
          required
        />
      </div>

      <div className="flex flex-col max-w-[300px] gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2">
            <option value="Clothing">Clothing</option>
            <option value="Sports">Sports</option>
            <option value="Accessories">Accessories</option>
            <option value="Travel">Travel</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Appliances">Appliances</option>
            <option value="Personal Care">Personal Care</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          {category === 'Clothing' ? (
            <select onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2">
              <option value="Men's Wear">Men’s Wear</option>
              <option value="Women's Wear">Women’s Wear</option>
              <option value="Kids' Wear">Kids’ Wear</option>
              <option value="Ethnic Wear">Ethnic Wear</option>
            </select>
          ) : null}

          {category === 'Sports' ? (
            <select onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2">
              <option value="Cricket">Cricket</option>
              <option value="Football">Football</option>
              <option value="Fitness Equipment">Fitness Equipment</option>
              <option value="Outdoor Gear">Outdoor Gear</option>
            </select>
          ) : null}

          {category === 'Accessories' ? (
            <select onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2">
              <option value="Watches">Watches</option>
              <option value="Sunglasses">Sunglasses</option>
              <option value="Bags & Wallets">Bags & Wallets</option>
              <option value="Belts">Belts</option>
            </select>
          ) : null}

          {category === 'Travel' ? (
            <select onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2">
              <option value="Luggage & Suitcases">Luggage & Suitcases</option>
              <option value="Travel Accessories">Travel Accessories</option>
              <option value="Travel Pillows">Travel Pillows</option>
              <option value="Passport Holders">Passport Holders</option>
            </select>
          ) : null}

          {category === 'Electronics' ? (
            <select onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2">
              <option value="Mobile Phones">Mobile Phones</option>
              <option value="Laptops">Laptops</option>
              <option value="Tablets">Tablets</option>
              <option value="Headphones">Headphones</option>
            </select>
          ) : null}

          {category === 'Furniture' ? (
            <select onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2">
              <option value="Sofas">Sofas</option>
              <option value="Beds">Beds</option>
              <option value="Tables & Desks">Tables & Desks</option>
              <option value="Chairs">Chairs</option>
            </select>
          ) : null}

          {category === 'Appliances' ? (
            <select onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2">
              <option value="Refrigerators">Refrigerators</option>
              <option value="Washing Machines">Washing Machines</option>
              <option value="Air Conditioners">Air Conditioners</option>
              <option value="Microwave Ovens">Microwave Ovens</option>
            </select>
          ) : null}

          {category === 'Personal Care' ? (
            <select onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2">
              <option value="Hair Care">Hair Care</option>
              <option value="Skin Care">Skin Care</option>
              <option value="Grooming Devices">Grooming Devices</option>
              <option value="Oral Care">Oral Care</option>
            </select>
          ) : null}
        </div>

        {category === 'Clothing' ? <div>
          <p className="mb-2">Product Sizes</p>
          <div className="flex gap-3">
            <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== 'S') : [...prev, "S"])}>
              <p className={`${sizes.includes('S') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>S</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== 'M') : [...prev, "M"])}>
              <p className={`${sizes.includes('M') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>M</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== 'L') : [...prev, "L"])}>
              <p className={`${sizes.includes('L') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>L</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== 'XL') : [...prev, "XL"])}>
              <p className={`${sizes.includes('XL') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XL</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== 'XXL') : [...prev, "XXL"])}>
              <p className={`${sizes.includes('XXL') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XXL</p>
            </div>
          </div>
        </div> : null}

        <div>
          <p className="mb-2">Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="99"
          />
        </div>


        <div>
          <p className="mb-2">Brand</p>
          <input onChange={(e)=>setBrand(e.target.value)} value={brand} type="text" placeholder="Enter Brand Name" className="w-full max-w-[500px] px-3 py-2" required />
        </div>

        <div>
          <p className="mb-2">Stock</p>
          <input onChange={(e) => setStock(e.target.value)} value={stock}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="1000"
          />
        </div>

        <div>
          <p className="mb-2">Add Features</p>
          <div className="flex gap-2 items-center mb-2">
          <input className="w-full max-w-[500px] px-3 py-2"
          type="text"
          value={featureInput}
          onChange={(e) => setFeatureInput(e.target.value)}
          placeholder="Enter a feature"
        />
        <span onClick={addFeature} className="material-symbols-outlined !text-3xl cursor-pointer">add</span>
          </div>
      
        <div className="flex">
        <ul className="flex flex-col gap-1 w-full">
          {features.map((feat, index) => (
            <div className="flex gap-1" key={index}>
              <li className="border w-full" >{feat}</li> 
            <span onClick={()=>removeFeature(index)} className="material-symbols-outlined !text-3xl cursor-pointer">remove</span>
          </div>
          ))}
        </ul>
    
        
        </div>
      
        </div>

        <div className="flex gap-2 mt-2">
          <input type="checkbox" id="bestseller" onChange={() => setBestSeller(prev => !prev)} checked={bestseller} />
          <label className="cursor-pointer" htmlFor="bestseller">
            Add to bestseller
          </label>
        </div>

        <button 
          type="submit"
          className="w-28 py-3 mt-4 bg-black text-white rounded-lg cursor-pointer"
        >
          {loading ? <ButtonLoader/> : "ADD"}
        </button>
      </div>
    </form>
  );
};

export default Add;
