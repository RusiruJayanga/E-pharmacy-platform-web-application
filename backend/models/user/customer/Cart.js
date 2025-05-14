import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
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
    enum: ["Medicine", "Accessory"],
  },
  quantity: {
    type: Number,
    min: 1,
    required: true,
    default: 1,
  },
  option: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  payment_status: { type: String, default: "Not Paid", required: true },
});

const PendingCartModel = mongoose.model("pendingcart", CartSchema);

export default PendingCartModel;
