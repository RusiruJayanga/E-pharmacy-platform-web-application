import PendingCart from "../../../models/user/customer/Cart.js";
import Order from "../../../models/user/common/OrderPlatform.js";
import OrderItem from "../../../models/user/common/OrderItem.js";
import Medicine from "../../../models/user/common/ProductMedicine.js";
import Accessory from "../../../models/user/common/ProductAccessory.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const paypalSuccess = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const { customerId } = jwt.verify(token, process.env.JWT_SECRET);

    const cartRows = await PendingCart.find({
      customer_id: customerId,
    }).populate("product_id");
    if (cartRows.length === 0) {
      return res.status(400).json({ message: "Cart empty" });
    }

    const deliveryFee = req.body.deliveryFee;
    const total = cartRows.reduce(
      (sum, row) => sum + row.price * row.quantity,
      deliveryFee
    );

    const order = await Order.create({
      customer_id: customerId,
      total_amount: total,
      delevery_method: req.body.deliveryMethod,
    });

    const orderItems = cartRows.map((row) => ({
      customer_id: customerId,
      seller_id: row.product_id.seller_id,
      order_id: order._id,
      product_id: row.product_id._id,
      productType: row.productType,
      quantity: row.quantity,
      option: row.option,
      price: row.price * row.quantity,
      delivery_date:
        req.body.deliveryMethod === "Express"
          ? new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
          : new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    }));

    const bulkMedicine = [];
    const bulkAccessory = [];

    cartRows.forEach((row) => {
      const qty = row.quantity;
      if (row.productType === "Medicine") {
        bulkMedicine.push({
          updateOne: {
            filter: { _id: row.product_id._id },
            update: { $inc: { quantity: -qty } },
          },
        });
      } else {
        bulkAccessory.push({
          updateOne: {
            filter: { _id: row.product_id._id },
            update: { $inc: { quantity: -qty } },
          },
        });
      }
    });

    if (bulkMedicine.length) await Medicine.bulkWrite(bulkMedicine);
    if (bulkAccessory.length) await Accessory.bulkWrite(bulkAccessory);

    await OrderItem.insertMany(orderItems);

    await PendingCart.deleteMany({ customer_id: customerId });

    res.status(200).json({ message: "Order stored", orderId: order._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Checkout failed" });
  }
};
