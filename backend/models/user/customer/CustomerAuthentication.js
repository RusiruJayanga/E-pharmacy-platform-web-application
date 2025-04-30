import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  postal_code: { type: String },
  phone_number: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate: {
      validator: (val) => /\d{3}/.test(val),
      message: "Password must include at least 3 digits.",
    },
  },
});

module.exports = mongoose.model("Customer", customerSchema);
