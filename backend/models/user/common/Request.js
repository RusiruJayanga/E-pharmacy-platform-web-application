import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
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
    enum: ["Medicine", "Lab", "Doctor"],
  },
  description: { type: String, required: false },
  image: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

export default mongoose.model("Request", requestSchema);
