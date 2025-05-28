import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = '₹';

  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(true)
  const [visible, setVisible] = useState(false)
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState('')
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);


  const addToCart = async (itemId, size, category) => {
    let cartData = structuredClone(cartItems);

    if (category === 'Clothing') {
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = (cartData[itemId][size] ?? 0) + 1;
    } else {
      cartData[itemId] = (cartData[itemId] ?? 0) + 1;
    }

    const quantity = category === 'Clothing' ? cartData[itemId][size] : cartData[itemId]

    setCartItems(cartData)
    toast.success('Added to Cart Successfully')

    if (token)
      try {
        await axios.post(backendUrl + '/api/cart/add', {
          itemId,
          size,
          quantity,
        }, {
          headers: { token }
        });
      } catch (error) {
        console.error("Error syncing cart to backend:", error.message);
        toast.error("Failed to sync cart with backend");
      }
  }



const updateQuantity = async (itemId, quantity, size, category) => {
  const cartData = structuredClone(cartItems);

  console.log("yaha check itemmmmmm", category)
  if (category === 'Clothing') {
    if (!cartData[itemId]) cartData[itemId] = {};

    cartData[itemId][size] = quantity;



  } else {
    cartData[itemId] = quantity;


  }
  setCartItems(cartData);
  if (token) {
    try {
      console.log('dekh le quantity', cartData[itemId][size]);
      console.log('dekh le quantity dobara', cartData[itemId])
      await axios.post(backendUrl + '/api/cart/update', {
        itemId,
        size,
        quantity: cartData[itemId][size] || cartData[itemId],
      }, {
        headers: { token },
      });
    } catch (error) {
      console.error("Error syncing cart to backend:", error);
      toast.error("Failed to sync cart with backend");
    }
  }
};
const getCartCount = () => {
  let totalCount = 0;

  for (const itemId in cartItems) {
    const item = cartItems[itemId];
    if (typeof item === 'object') {
      for (const size in item) {
        totalCount += item[size];
      }
    } else {
      totalCount += item;
    }
  }

  return totalCount;
};

const getCartAmount = () => {
  let totalAmount = 0;

  for (const itemId in cartItems) {
    const item = cartItems[itemId];
    const product = products.find(p => p._id === itemId);

    if (!product) continue;

    if (typeof item === 'object') {
      for (const size in item) {
        totalAmount += product.price * item[size];
      }
    } else {
      totalAmount += product.price * item;
    }
  }

  return totalAmount;
};



const getProductsData = async () => {
  try {
    console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
    const response = await axios.get(backendUrl + "/api/product/list")
    if (response.data.success) {
      setProducts(response.data.products)
    } else {
      toast.error(response.data.message)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

const getUserCart = async (token) => {
  try {
    const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
    if (response.data.success) {
      setCartItems(response.data.cartData)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

useEffect(() => {
  getProductsData()
}, [])

useEffect(() => {
  if (!token && localStorage.getItem('token')) {
    setToken(localStorage.getItem('token'))
    getUserCart(localStorage.getItem('token'))
  }
}, [token])


const value = {
  products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, visible, setVisible, cartItems, setCartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate, backendUrl, setToken, token,
  loading, setLoading
}



return (
  <ShopContext.Provider value={value}>
    {props.children}
  </ShopContext.Provider>
)
}

export default ShopContextProvider;