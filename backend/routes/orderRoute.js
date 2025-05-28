import express from'express'
import  {placeOrder,placeOrderRazorpay,allOrders,updateStatus,userOrders, verifyRazorpay} from '../controllers/orrderController.js'
import adminAuth from "../middleware/adminAuth.js";
import isAdmin from '../middleware/isAdmin.js';
import authUser from '../middleware/auth.js'


const orderRouter = express.Router()

orderRouter.post('/list',adminAuth,isAdmin,allOrders)
orderRouter.post('/status',adminAuth,isAdmin,updateStatus)
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

orderRouter.get('/userorders',authUser,userOrders)

export default orderRouter