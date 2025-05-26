import Appointment from "../../../../models/user/common/Appointment.js";
import jwt from "jsonwebtoken";

const getDoctorId = (req) => {
  const auth = req.headers.authorization || "";
  if (!auth.startsWith("Bearer ")) return null;

  try {
    const token = auth.split(" ")[1];
    const { doctorId } = jwt.verify(token, process.env.JWT_SECRET);
    return doctorId;
  } catch {
    return null;
  }
};

export const getNewAppointments = async (req, res) => {
  const doctorId = getDoctorId(req);
  if (!doctorId) return res.status(401).json({ message: "Invalid token" });

  try {
    const appointments = await Appointment.find({
      seller_id: doctorId,
      status: "Pending",
    }).populate("customer_id");

    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getEndAppointments = async (req, res) => {
  const doctorId = getDoctorId(req);
  if (!doctorId) return res.status(401).json({ message: "Invalid token" });

  try {
    const appointments = await Appointment.find({
      seller_id: doctorId,
      status: "Accepted",
    }).populate("customer_id");

    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getRejectedAppointments = async (req, res) => {
  const doctorId = getDoctorId(req);
  if (!doctorId) return res.status(401).json({ message: "Invalid token" });

  try {
    const appointments = await Appointment.find({
      seller_id: doctorId,
      status: "Rejected",
    }).populate("customer_id");

    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getDoctorStats = async (req, res) => {
  const doctorId = getDoctorId(req);
  if (!doctorId) return res.status(401).json({ message: "Invalid token" });

  try {
    const [totalAppointments, distinctCustomers] = await Promise.all([
      Appointment.countDocuments({ seller_id: doctorId }),
      Appointment.distinct("customer_id", { seller_id: doctorId }),
    ]);

    res.json({
      totalAppointments,
      totalClients: distinctCustomers.length,
      averageRating: 4.5,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
