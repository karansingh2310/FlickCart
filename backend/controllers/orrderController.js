import { response } from "express";
import orderModel from "../models/OrderModel.js"
import userModel from "../models/userModel.js"
import productModel from "../models/productModel.js";
import razorpay from 'razorpay'

const currency = 'inr'
const deliveryCharge = 10

const razorpay_Instance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

const placeOrder = async (req,res) =>{
    try {
        const { items, amount, address} = req.body
        const userId = req.userId;
        
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId,{cartData:{}})

       return res.json({success: true, message: "Order Placed"})
        
    } catch (error) {
        console.log(error)
      return  res.json({success: false, message: error.message})
    }
}

const placeOrderRazorpay = async (req,res) =>{
try {
  const {items, amount,address} = req.body
  const userId = req.userId;

  const orderData = {
    userId,
    items,
    address,
    amount,
    paymentMethod: "Razorpay",
    payment: false,
    date: Date.now()
  }

      const newOrder = new orderModel(orderData)
      await newOrder.save()

      const options = {
        amount: amount*100,
        currency: currency.toUpperCase(),
        receipt: newOrder._id.toString()
      }

         const razorpayOrder = await razorpay_Instance.orders.create(options);

    // Clear user's cart after order placement
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Send response with Razorpay order details for frontend to initiate payment
    res.json({
      success: true,
      order: {
        id: razorpayOrder.id, // Razorpay Order ID (needed for payment initiation)
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
      message: 'Order created successfully',
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return res.json({
      success: false,
      message: error.message || 'Failed to create Razorpay order',
    });
  }
};

const verifyRazorpay = async (req,res)=>{
  try {
    const {razorpay_order_id} = req.body
    const userID = req.userID

    const orderInfo = await razorpay_Instance.orders.fetch(razorpay_order_id)
    if(orderInfo.status === 'paid'){
      await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
      await userModel.findByIdAndUpdate(userID,{cartData:{}})
      res.json({success:true, message:"Payment Successfull"})
    }else{
      res.json({success:false, message: "Payment Failed"})
    }
  } catch (error) {
        console.log(error);
    return res.json({ success: false, message: error.message });
  }
}


const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    const enhancedOrders = await Promise.all(
      orders.map(async (order) => {
        const orderObj = order.toObject();
        orderObj.items = await Promise.all(
          orderObj.items.map(async (item) => {
            console
            const product = await productModel.findById(item.productId);
            return {
              ...item,
              name: product?.name,
              image: product?.image,
              price: product?.price,
            };
          })
        );
        return orderObj;
      })
    );
    
    res.json({ success: true, orders: enhancedOrders });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};


const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel.find({ userId });

    const enhancedOrders = await Promise.all(
      orders.map(async (order) => {
        const orderObj = order.toObject();
        orderObj.items = await Promise.all(orderObj.items.map(async (item) => {
          const product = await productModel.findById(item.productId);
          return {
            ...item,
            name: product?.name,
            image: product?.image,
            price: product?.price,
          };
        }));
        return orderObj;
      })
    );
    res.json({ success: true, orders: enhancedOrders });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
}

const updateStatus = async (req,res) =>{
      try {
        const {orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success: true, message:'Status Updated'})
      } catch (error) {
            console.log(error);
    return res.json({ success: false, message: error.message });
      }
}

export {placeOrder,placeOrderRazorpay,allOrders,updateStatus,userOrders,verifyRazorpay}