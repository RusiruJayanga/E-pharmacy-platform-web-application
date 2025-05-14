import mongoose from "mongoose";

const saveSchema = new mongoose.Schema({
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
    enum: ["Medicine", "Accessory", "Lab", "Doctor", "Pharmacy"],
  },
});

const WishlistModel = mongoose.model("Save", saveSchema);

export default WishlistModel;
