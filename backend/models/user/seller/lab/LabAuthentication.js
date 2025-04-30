import mongoose from "mongoose";

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
  nmra_cert: { type: String },
  diagnostic_license: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: {
    lat: Number,
    lng: Number,
  },
});

module.exports = mongoose.model("Lab", labSchema);
