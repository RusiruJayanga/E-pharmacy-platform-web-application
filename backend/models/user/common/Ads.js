import mongoose from "mongoose";

const adsSchema = new mongoose.Schema({
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
  session_price: { type: Number, required: true },
  session_location: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: false },
});

const WishlistModel = mongoose.model("Save", adsSchema);

export default WishlistModel;
