import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {

const [method,setMethod] = useState('cod')
const {navigate} = useContext(ShopContext)


  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rouunded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
          />
          <input
            className="border border-gray-300 rouunded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          className="border border-gray-300 rouunded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email Address"
        />
        <input
          className="border border-gray-300 rouunded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rouunded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            className="border border-gray-300 rouunded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rouunded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Pincode"
          />
          <input
            className="border border-gray-300 rouunded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          className="border border-gray-300 rouunded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Mobile Number"
        />
      </div>

      <div className="mt-8 ">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12 sm:text-2xl text-xl">
          <p className="text-center font-medium ">Payment Method</p>
          <br />
          <div className="flex flex-col gap-3 lg:flex-row">
            <div onClick={()=>setMethod('stripe')} className="flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-md">
              <p className={`w-4 h-4 border-2 border-gray-500 rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img
                className="w-20 h-auto object-contain"
                src={assets.stripe_logo}
                alt="Stripe Logo"
              />
            </div>
            <div onClick={()=>setMethod('razor')} className="flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-md">
              <p className={`w-4 h-4 border-2 border-gray-500 rounded-full ${method === 'razor' ? 'bg-green-400' : ''}`}></p>
              <img
                className="w-20 h-auto object-contain"
                src={assets.razor_logo}
                alt="Razorpay Logo"
              />
            </div>
            <div  onClick={()=>setMethod('cod')} className="flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-md">
              <p className={`w-4 h-4 border-2 border-gray-500 rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
               <p className="text-gray-500 text-xl font-medium mx-4">Cash On Delivery</p> 
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button onClick={()=>navigate('/orders')} className="bg-black text-white px-16 py-3 text-sm cursor-pointer">PLACE ORDER</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
