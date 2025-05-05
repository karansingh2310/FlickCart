import {v2 as cloudinary} from "cloudinary"
import productMondel from "../models/productModel.js"

// Add product

const addProduct = async (req , res) =>{
try {
  const {name,description,price,category,subCategory,bestseller,brand,rating,features,stock} = req.body

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1,image2,image3,image4].filter(Boolean)

    let imagesUrl = await Promise.all(
        images.map(async(item)=>{
            let result = await cloudinary.uploader.upload(item.path,{resource_type: 'image'})
            return result.secure_url
        })
    )

    const productData = {
        name,
        description,
        price: Number(price),
        category,
        subCategory,
        bestseller: bestseller === "true"? true:false,
        brand,
        stock: Number(stock),
        rating: Number(rating),
        features: JSON.parse(features),
        image: imagesUrl,
        date: Date.now()     
    }

    console.log(name,description,price,category,subCategory,bestseller,brand,rating,features);
    console.log(productData);

    const product =  productMondel(productData)
    await product.save()
   
    
    res.json({success: true, message: "all good product added"})
} catch (error) {
    console.log(error)
    res.json({success: false, message: error.message})
}
}

//list product

const listProduct = async (req , res) =>{
    
}

//remove Product

const removeProduct = async (req , res) =>{

}

// single product info]

const singleProduct = async (req , res) =>{

}


export {listProduct, addProduct, removeProduct, singleProduct}