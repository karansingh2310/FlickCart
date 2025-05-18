import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    const item = await productModel.findById(itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const { category } = item;

    if (category === "Clothing" && size) {
      if (!cartData[itemId]) cartData[itemId] = {};
  

      if (Number.isNaN(cartData[itemId][size])) {
        cartData[itemId][size] = 0;
 
      }
      

      cartData[itemId][size] += 1;

    } else {
      const currentQty = cartData[itemId]?.quantity || 0;
      cartData[itemId] = { quantity: currentQty + 1 };
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to Cart" });

  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    console.log("ye hau quantuhde" ,quantity)
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    const item = await productModel.findById(itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const { category } = item;
    let qty = Number(quantity); // Ensure it's a number
    console.log(qty)

    if (category === "Clothing" && size) {
      qty = qty || Number(quantity[size]);
      console.log("clothing quantity", qty);
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = qty;

      if (cartData[itemId][size] <= 0) {
        delete cartData[itemId][size];
      }

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }

    } else {
      if (qty <= 0) {
        delete cartData[itemId];
      } else {
        cartData[itemId] = { quantity: qty };
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart updated successfully" });

  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addToCart, updateCart, getUserCart };