import Appointment from "../../../models/user/common/Appointment.js";
import Doctor from "../../../models/user/seller/doctor/DoctorAuthentication.js";
import Lab from "../../../models/user/seller/lab/LabAuthentication.js";
import jwt from "jsonwebtoken";

export const getCustomerAppointments = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer_id = decoded.customerId;

    const appointments = await Appointment.find({ customer_id })
      .sort({ book_date: -1 })
      .populate("customer_id", "name email")
      .lean();

    const enhancedAppointments = await Promise.all(
      appointments.map(async (appointment) => {
        if (appointment.sellerType === "Doctor") {
          const doctor = await Doctor.findById(appointment.seller_id)
            .select("name profile_picture")
            .lean();
          return { ...appointment, seller: doctor || null };
        } else {
          const lab = await Lab.findById(appointment.seller_id)
            .select("lab_name profile_picture")
            .lean();
          return { ...appointment, seller: lab || null };
        }
      })
    );

    res.status(200).json(enhancedAppointments);
  } catch (error) {
    console.error("Error in getCustomerAppointments:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
