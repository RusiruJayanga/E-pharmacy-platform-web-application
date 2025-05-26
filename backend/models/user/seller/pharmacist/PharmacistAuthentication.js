import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const pharmacistSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  owner_name: { type: String, required: true },
  pharmacy_name: { type: String, required: true },
  national_id: { type: String, required: true },
  slmc_number: { type: String, required: true },
  district: { type: String, required: true },
  address: { type: String, required: true },
  postal_code: { type: String, required: true },
  phone_number: { type: String, required: true },
  working_hours: {
    open: String,
    close: String,
  },
  registration_certificate: { type: String, required: true },
  government_id: { type: String, required: true },
  profile_picture: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: {
    lat: Number,
    lng: Number,
  },
  description: { type: String, required: true },
  account_status: { type: String, default: "Pending", required: true },
  rate: { type: Number, default: 0 },
});

// Hash password before saving
pharmacistSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Pharmacist = mongoose.model("Pharmacist", pharmacistSchema);
export default Pharmacist;
