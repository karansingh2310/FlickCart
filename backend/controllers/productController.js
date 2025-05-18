import cloudinary from "../config/cloudinary.js";
import productModel from "../models/productModel.js"

// Add product

const addProduct = async (req , res) =>{
try {
  const {name,description,price,category,subCategory,bestseller,brand,features,stock,sizes} = req.body

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
        features: features ? JSON.parse(features) : [],
        image: imagesUrl,
        date: Date.now(),   
        sizes: sizes ? JSON.parse(sizes) : []
    }

    console.log(name,description,price,category,subCategory,bestseller,brand,features);
    console.log(productData);

    const product =  productModel(productData)
    await product.save()
   
    
    res.json({success: true, message: "all good product added"})
} catch (error) {
    console.log(error)
    res.json({success: false, message: error.message})
}
}

//list product

const listProduct = async (req , res) =>{
    try {
        const products = await productModel.find({})
        res.json({success: true, products})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error})
    }
}

//remove Product

const removeProduct = async (req , res) =>{
try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({success: true, message: "Product removed"})
} catch (error) {
    console.log(error)
    res.json({success: false, message: error})
}
}

// single product info]

const singleProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await productModel.findById(productId);
  
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
  
      res.status(200).json({ success: true, product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };


export {listProduct, addProduct, removeProduct, singleProduct}