import express from "express"
import { addProduct, listProduct, removeProduct, singleProduct } from "../controllers/productController.js"
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import isAdmin from '../middleware/isAdmin.js';

const productRouter = express.Router();

productRouter.post('/add',adminAuth,isAdmin,upload.fields([{name: "image1", maxCount:1},{name: "image2", maxCount:1},{name: "image3", maxCount:1},{name: "image4", maxCount:1}]), addProduct)
productRouter.get('/list',listProduct)
productRouter.post('/remove',adminAuth,isAdmin,removeProduct)
productRouter.get('/single/:productId',singleProduct)

export default productRouter