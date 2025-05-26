import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2 },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true, maxlength: 200 },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
