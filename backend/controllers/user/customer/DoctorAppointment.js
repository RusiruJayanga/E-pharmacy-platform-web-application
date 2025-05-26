import Appointment from "../../../models/user/common/Appointment.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const createDoctorAppointment = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer_id = decoded.customerId;

    const { product_id } = req.body;
    if (!product_id)
      return res
        .status(400)
        .json({ message: "sellerId and dueDate are required" });

    const appointment = await Appointment.create({
      customer_id: new mongoose.Types.ObjectId(customer_id),
      seller_id: new mongoose.Types.ObjectId(product_id),
      sellerType: "Doctor",
    });

    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
