import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
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
  description: { type: String, required: false },
  seller_description: { type: String, required: false },
  image: { type: String, required: true },
  request_date: { type: Date, default: Date.now, required: true },
  due_date: { type: Date, required: false },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

export default mongoose.model("Request", requestSchema);
