import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slmc_number: { type: String, required: true },
  national_id: { type: String, required: true },
  specialty: { type: String, required: true },
  district: { type: String, required: true },
  address: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  license_file: { type: String },
  profile_picture: { type: String, required: true },
});

module.exports = mongoose.model("Doctor", doctorSchema);
