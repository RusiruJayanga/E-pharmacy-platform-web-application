import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  total_amount: { type: Number, required: true },
  payment_status: { type: String, default: "Paid", required: true },
  order_date: { type: Date, default: Date.now, required: true },
  delevery_method: {
    type: String,
    enum: ["Normal", "Express"],
    default: "Normal",
  },
});

export default mongoose.model("Order", orderSchema);
