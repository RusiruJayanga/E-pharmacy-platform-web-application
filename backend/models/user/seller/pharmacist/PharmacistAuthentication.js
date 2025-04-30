import mongoose from "mongoose";

const pharmacistSchema = new mongoose.Schema({
  owner_name: { type: String, required: true },
  pharmacy_name: { type: String, required: true },
  national_id: { type: String, required: true },
  slmc_number: { type: String, required: true },
  district: { type: String, required: true },
  address: { type: String, required: true },
  postal_code: { type: String },
  phone_number: { type: String, required: true },
  working_hours: {
    open: String,
    close: String,
  },
  registration_certificate: { type: String }, // file path
  government_id: { type: String }, // file path
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: {
    lat: Number,
    lng: Number,
  },
});

module.exports = mongoose.model("Pharmacist", pharmacistSchema);
