import express from "express";
import {
  getNewAppointments,
  getEndAppointments,
  getRejectedAppointments,
  getDoctorStats,
} from "../../../../controllers/user/seller/doctor/DoctorHome.js";

const router = express.Router();

router.get("/appointments/new", getNewAppointments);
router.get("/appointments/end", getEndAppointments);
router.get("/appointments/rejected", getRejectedAppointments);
router.get("/stats", getDoctorStats);

export default router;
