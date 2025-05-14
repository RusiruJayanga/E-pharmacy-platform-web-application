import WishlistModel from "../../../models/user/customer/Save.js";
import jwt from "jsonwebtoken";

export const addToWishlist = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer_id = decoded.customerId;

    const { product_id, productType } = req.body;

    const alreadySaved = await WishlistModel.findOne({
      customer_id,
      product_id,
    });

    if (alreadySaved) {
      return res.status(400).json({ message: "Item already in your savelist" });
    }

    const newSave = new WishlistModel({
      customer_id,
      product_id,
      productType,
    });

    await newSave.save();
    res.status(201).json({ message: "Saved successfully" });
  } catch (error) {
    console.error("Save Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
