import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "sellerType",
  },
  sellerType: {
    type: String,
    required: true,
    enum: ["Lab", "Doctor"],
  },
  description: { type: String, required: false },
  book_date: { type: Date, default: Date.now, required: true },
  due_date: { type: Date, required: true },
  image: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },

  payment_status: { type: String, default: "over-the-counter", required: true },
});

export default mongoose.model("Appointment", appointmentSchema);
