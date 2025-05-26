import express from "express";
import {
  getAppointmentById,
  approveAppointment,
  rejectAppointment,
} from "../../../../controllers/user/seller/doctor/AppointmentDetails.js";

const router = express.Router();

router.get("/get/:appointmentId", getAppointmentById);

router.post("/approve/:appointmentId", approveAppointment);

router.post("/reject/:appointmentId", rejectAppointment);

export default router;
