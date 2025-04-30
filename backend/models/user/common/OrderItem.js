import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pharmacist",
    required: true,
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "productType",
  },
  productType: {
    type: String,
    required: true,
    enum: ["Medicine", "Accessory"],
  },
  quantity: {
    type: Number,
    min: 1,
    required: true,
  },
  option: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  status: {
    type: String,
    enum: ["processing", "shipped", "delivered", "cancelled"],
    default: "processing",
  },
  order_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  delivery_date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("OrderItem", orderItemSchema);
