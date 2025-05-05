import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: Array, required: true},
    category: {type: String, required: true},
    subCategory: {type: String, required: true},
    brand: {type: String, required: true},
    rating: {type: Number, required: true},
    stock: {type: Number, required: true},
    bestseller: {type: Boolean},
    date: {type: Number, required: true},
    features: {type: Array, required: true},

})

const productMondel = mongoose.models.product || mongoose.model("product",productSchema)

export default productMondel