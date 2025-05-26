import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pharmacist",
    required: false,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    refPath: "productType",
  },
  productType: {
    type: String,
    required: false,
    enum: ["Medicine", "Accessory"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    maxlength: 500,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model("Review", reviewSchema);
