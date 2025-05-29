import PendingCartModel from "../../../models/user/customer/Cart.js";
import Medicine from "../../../models/user/common/ProductMedicine.js";
import Accessory from "../../../models/user/common/ProductAccessory.js";
import jwt from "jsonwebtoken";

export const getCartItems = async (req, res) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer_id = decoded.customerId;

    const cartItems = await PendingCartModel.find({ customer_id }).populate(
      "product_id"
    );

    res.status(200).json(cartItems);
  } catch (err) {
    console.error("Fetch cart error:", err.message);
    res.status(500).json({ message: "Failed to fetch cart items" });
  }
};

export const updateCartQuantity = async (req, res) => {
  const { cartId } = req.params;
  const { newQuantity } = req.body;

  try {
    const cartItem = await PendingCartModel.findById(cartId);

    if (!cartItem)
      return res.status(404).json({ message: "Cart item not found" });

    const product =
      cartItem.productType === "Medicine"
        ? await Medicine.findById(cartItem.product_id)
        : await Accessory.findById(cartItem.product_id);

    if (!product || product.quantity < newQuantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    cartItem.quantity = newQuantity;
    await cartItem.save();

    res.status(200).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: "Error updating quantity" });
  }
};

export const deleteCartItem = async (req, res) => {
  const { cartId } = req.params;

  try {
    await PendingCartModel.findByIdAndDelete(cartId);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item" });
  }
};
