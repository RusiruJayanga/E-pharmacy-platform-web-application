import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  target: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "targetModel",
  },
  targetModel: {
    type: String,
    required: true,
    enum: ["Pharmacist", "Medicine", "Accessory", "Doctor", "Lab"],
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
  },
});

export default mongoose.model("Review", reviewSchema);
