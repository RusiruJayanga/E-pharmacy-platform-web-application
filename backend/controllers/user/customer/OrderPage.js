import OrderItem from "../../../models/user/common/OrderItem.js";
import Medicine from "../../../models/user/common/ProductMedicine.js";
import Accessory from "../../../models/user/common/ProductAccessory.js";
import jwt from "jsonwebtoken";

export const getCustomerOrders = async (req, res) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer_id = decoded.customerId;

    const orders = await OrderItem.find({ customer_id }).populate(
      "product_id",
      "name images"
    );

    res.status(200).json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err.message);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
