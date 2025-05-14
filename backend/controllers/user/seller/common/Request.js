import Doctor from "../../../../models/user/seller/doctor/DoctorAuthentication.js";
import Pharmacist from "../../../../models/user/seller/pharmacist/PharmacistAuthentication.js";
import Lab from "../../../../models/user/seller/lab/LabAuthentication.js";
import Customer from "../../../../models/user/customer/CustomerAuthentication.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const requestSellerRole = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const role = req.body.role;

    if (!["Doctor", "Pharmacist", "Lab Owner"].includes(role)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Invalid seller role" });
    }

    const { email, phone_number } = req.body;

    //check for duplicate seller email or phone
    let existingSeller = null;

    if (role === "Doctor") {
      existingSeller = await Doctor.findOne({
        $or: [{ email }, { phone_number }],
      });
    } else if (role === "Pharmacist") {
      existingSeller = await Pharmacist.findOne({
        $or: [{ email }, { phone_number }],
      });
    } else if (role === "Lab Owner") {
      existingSeller = await Lab.findOne({
        $or: [{ email }, { phone_number }],
      });
    }

    if (existingSeller) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message:
          existingSeller.email === email
            ? "Email already in use"
            : "Phone number already in use",
      });
    }

    //create the seller
    let createdSeller = null;

    switch (role) {
      case "Doctor":
        createdSeller = new Doctor({
          ...req.body,
          account_status: "Pending",
          license_file: req.body.license_file,
          profile_picture: req.body.profile_picture,
        });
        await createdSeller.save({ session });
        break;

      case "Pharmacist":
        createdSeller = new Pharmacist({
          ...req.body,
          account_status: "Pending",
          registration_certificate: req.body.registration_certificate,
          government_id: req.body.government_id,
          profile_picture: req.body.profile_picture,
        });
        await createdSeller.save({ session });
        break;

      case "Lab Owner":
        createdSeller = new Lab({
          ...req.body,
          account_status: "Pending",
          nmra_cert: req.body.nmra_cert,
          diagnostic_license: req.body.diagnostic_license,
          profile_picture: req.body.profile_picture,
        });
        await createdSeller.save({ session });
        break;
    }

    //decode token
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const customerEmail = decoded.email;

      const existingCustomer = await Customer.findOne({
        email: customerEmail,
      }).session(session);
      if (existingCustomer) {
        existingCustomer.account_status = `${role} Pending`;
        await existingCustomer.save({ session });
      }
    }

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Request submitted successfully!" });
  } catch (err) {
    console.error("Request error:", err.message);
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Server error during registration!" });
  }
};
