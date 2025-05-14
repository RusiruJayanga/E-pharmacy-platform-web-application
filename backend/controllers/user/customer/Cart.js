import PendingCartModel from "../../../models/user/customer/Cart.js";
import jwt from "jsonwebtoken";

export const addToCart = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer_id = decoded.customerId;

    const { product_id, productType, option, price } = req.body;

    const alreadyInCart = await PendingCartModel.findOne({
      customer_id,
      product_id,
      option,
    });

    if (alreadyInCart) {
      return res.status(400).json({ message: "Product already in your cart" });
    }

    const newCartItem = new PendingCartModel({
      customer_id,
      product_id,
      productType,
      option,
      price,
    });

    await newCartItem.save();
    res.status(201).json({ message: "Added to cart successfully!" });
  } catch (error) {
    console.error("Cart Add Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
