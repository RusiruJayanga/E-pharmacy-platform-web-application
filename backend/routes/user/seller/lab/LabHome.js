import express from "express";
import {
  getNewAppointments,
  getEndAppointments,
  getRejectedAppointments,
  getLabStats,
} from "../../../../controllers/user/seller/lab/LabHome.js";

const router = express.Router();

router.get("/appointments/lab/new", getNewAppointments);
router.get("/appointments/lab/end", getEndAppointments);
router.get("/appointments/lab/rejected", getRejectedAppointments);
router.get("/lab/stats", getLabStats);

export default router;
