import mongoose from "mongoose";

const accessorySchema = new mongoose.Schema({
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pharmacist",
    required: true,
  },
  name: { type: String, required: true },
  quantity: { type: Number, min: 0, required: true },
  options: [{ name: String, price: { type: Number, min: 0 } }],
  description: { type: String, required: true },
  category: { type: String, required: true },
  discount: { type: Number, required: false, default: 0 },
  images: [String],
});

const Accessory = mongoose.model("Accessory", accessorySchema);
export default Accessory;
