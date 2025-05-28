import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonLoader from "../../../admin/src/components/ButtonLoader";

const PlaceOrder = () => {

const [method,setMethod] = useState('cod')
const [loading, setLoading] = useState(false);
const {navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_fee,products} = useContext(ShopContext)
  const [ready, setReady] = useState(false);



const [formData,setFormData] = useState({
  firstName:'',
  lastName: '',
  email: '',
  street: '',
  city: '',
  state: '',
  pincode: '',
  country: '',
  phone: ''
})


const onChangeHandler = (e) =>{
  const name = e.target.name;
  const value = e.target.value;

  setFormData(data => ({...data,[name]:value}))
}

const initPay = (order)=> {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: 'Order Payment',
    description: 'Order Payment',
    order_id: order.id,
    receipt: order.receipt,
    handler: async (response)=>{
        console.log(response)
        try {
          const {data} = await axios.post(backendUrl+'/api/cart/order/verifyRazorpay',response,{headers:{token}})
          if(data.success){
            navigate('/orders')
            setCartItems({})
          }
        } catch (error) {
          console.log(error)
          toast.error(error);
          
        }
    }
  }
  const rzp = new window.Razorpay(options)
  rzp.open()
}

const onSubmitHandler = async (e)=>{
  e.preventDefault()
  console.log("DEBUG  ➜ token        :", token);
console.log("DEBUG  ➜ products.len :", products.length);
console.log("DEBUG  ➜ cartItems    :", cartItems);
console.log("DEBUG  ➜ getCartAmount:", getCartAmount());

  try {
    setLoading(true);
    const orderItems = [];

    for (const [productId, itemData] of Object.entries(cartItems)) {
        if (itemData && typeof itemData === 'object' && 'quantity' in itemData) {
    if (itemData.quantity > 0)
      orderItems.push({ productId, quantity: itemData.quantity });
    continue;
  }

  if (typeof itemData === 'number') {
    if (itemData > 0)
      orderItems.push({ productId, quantity: itemData });
    continue;
  }


  for (const [size, qty] of Object.entries(itemData)) {
    if (qty > 0)
      orderItems.push({ productId, size, quantity: qty });
  }
}

    let orderData = {
      address: formData,
      items: orderItems,
      amount: getCartAmount() + delivery_fee,
    }

    switch(method){
      
      case 'cod': 
      console.log('andar')
      try {
        const response = await axios.post(backendUrl+'/api/cart/order/place',orderData,{headers:{token}})
        if(response.data.success){
          console.log('i am in')
          setCartItems({})
          navigate('/orders')
        }else{
          toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error)
      }
      break;

      case 'razorpay':
        const responseRazorpay = await axios.post(backendUrl + '/api/cart/order/razorpay',orderData,{headers:{token}})
        if(responseRazorpay.data.success){
          initPay(responseRazorpay.data.order)
        }

      default:
        break;
    }
    
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
  finally {
      setLoading(false);
    }
}


  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName}
            className="border border-gray-300 rouunded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
          />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName}
            className="border border-gray-300 rouunded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email}
          className="border border-gray-300 rouunded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email Address"
        />
        <input required onChange={onChangeHandler} name='street' value={formData.street}
          className="border border-gray-300 rouunded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='city' value={formData.city}
            className="border border-gray-300 rouunded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input required onChange={onChangeHandler} name='state' value={formData.state}
            className="border border-gray-300 rouunded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='pincode' value={formData.pincode}
            className="border border-gray-300 rouunded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Pincode"
          />
          <input required onChange={onChangeHandler} name='country' value={formData.country}
            className="border border-gray-300 rouunded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone}
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
          <div className="flex flex-col gap-3 lg:flex-row ">
           
            <div onClick={()=>setMethod('razorpay')} className="flex flex-1 items-center gap-3 border p-3 px-4 cursor-pointer rounded-md">
              <p className={`w-4 h-4 border-2 border-gray-500 rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img
                className="w-20 h-auto object-contain"
                src={assets.razor_logo}
                alt="Razorpay Logo"
              />
            </div>
            <div  onClick={()=>setMethod('cod')} className="flex flex-1 items-center gap-3 border p-3 px-4 cursor-pointer rounded-md">
              <p className={`w-4 h-4 border-2 border-gray-500 rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
               <p className="text-gray-500 text-xl font-medium mx-4">Cash On Delivery</p> 
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button type="submit"  className="bg-black text-white px-16 py-3 text-sm cursor-pointer">{loading ? <ButtonLoader/> : 'Place Order'}</button>
          </div>

        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
