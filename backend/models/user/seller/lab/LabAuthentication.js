import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const labSchema = new mongoose.Schema({
  pathologist_name: { type: String, required: true },
  lab_name: { type: String, required: true },
  national_id: { type: String, required: true },
  lab_tests: [String],
  business_reg_number: { type: String, required: true },
  district: { type: String, required: true },
  address: { type: String, required: true },
  postal_code: { type: String },
  phone_number: { type: String, required: true },
  working_hours: {
    open: String,
    close: String,
  },
  nmra_cert: { type: String, required: true },
  diagnostic_license: { type: String, required: true },
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
labSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Lab = mongoose.model("Lab", labSchema);
export default Lab;
