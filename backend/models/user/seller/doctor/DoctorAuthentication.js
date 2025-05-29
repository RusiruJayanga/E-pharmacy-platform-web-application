import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const doctorSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  name: { type: String, required: true },
  slmc_number: { type: String, required: true },
  national_id: { type: String, required: true },
  specialty: { type: String, required: true },
  district: { type: String, required: true },
  address: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  license_file: { type: String, required: true },
  profile_picture: { type: String, required: true },
  description: { type: String, required: true },
  account_status: { type: String, default: "Pending", required: true },
  rate: { type: Number, default: 0 },
});

doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
