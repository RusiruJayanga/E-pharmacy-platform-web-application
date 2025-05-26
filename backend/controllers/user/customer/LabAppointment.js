import Appointment from "../../../models/user/common/Appointment.js";
import mongoose from "mongoose";

export const uploadLabPrescription = async (req, res) => {
  try {
    const { customer_id, seller_id, sellerType, description, image, due_date } =
      req.body;

    if (!customer_id || !seller_id || !sellerType) {
      return res
        .status(400)
        .json({
          message: "customer_id, seller_id and sellerType are required",
        });
    }

    if (!["Doctor", "Lab"].includes(sellerType)) {
      return res
        .status(400)
        .json({ message: "sellerType must be Doctor or Lab" });
    }

    const appointment = new Appointment({
      customer_id: new mongoose.Types.ObjectId(customer_id),
      seller_id: new mongoose.Types.ObjectId(seller_id),
      sellerType,
      description: description || "",
      image: image || "",
      status: "Pending",
      payment_status: "over-the-counter",
    });

    await appointment.save();

    return res
      .status(201)
      .json({ message: "Prescription/appointment uploaded successfully!" });
  } catch (error) {
    console.error("Error saving appointment:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
