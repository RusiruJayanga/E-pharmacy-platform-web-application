import express from "express";
import {
  getDoctorsByStatus,
  updateDoctorStatus,
  getDoctorDetails,
} from "../../controllers/admin/DoctorsPage.js";

const router = express.Router();

router.get("/doctor/status/:status", getDoctorsByStatus);
router.put("/doctor/:id/status", updateDoctorStatus);
router.get("/doctor/:id", getDoctorDetails);

export default router;
