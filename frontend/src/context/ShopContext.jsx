import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import {toast} from "react-toastify"

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

const currency = '₹';

const delivery_fee  = 10;
const [search,setSearch] = useState('')
const [showSearch,setShowSearch] = useState(true)
const [visible, setVisible] = useState(false)
const [cartItems, setCartItems] = useState({});



    const addToCart = async (itemId)=>{


          let cartData = structuredClone(cartItems)

          if(cartData[itemId]){
                cartData[itemId]+=1;
                toast.success("Added to Cart successful!");
            }else{
                
                cartData[itemId] = 1;
                toast.success("Added to Cart successful!");
            }

           

            setCartItems(cartData)
          
    }

    const updateQuantity = async (itemId,quantity)=>{
        let cartData = structuredClone(cartItems)
        cartData[itemId] = quantity;
        setCartItems(cartData)
   }

    const getCartCount = () => {
        let totalCount = 0;
      
        
        for (const itemId in cartItems) {
          
          if (cartItems[itemId] > 0) {
            totalCount += cartItems[itemId];
          }
        }
      
        return totalCount;
      };

   

    
        const value = {
            products,currency,delivery_fee,search,setSearch,showSearch,setShowSearch,visible,setVisible,cartItems,addToCart,getCartCount,updateQuantity
        }

        useEffect(()=>{
            console.log(getCartCount())
         console.log(cartItems)
        },[cartItems])

    return (
        <ShopContext.Provider value={value}>
           {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;