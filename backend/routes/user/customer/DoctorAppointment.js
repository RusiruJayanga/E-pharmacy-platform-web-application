import express from "express";
import { createDoctorAppointment } from "../../../controllers/user/customer/DoctorAppointment.js";

const router = express.Router();

router.post("/doctor", createDoctorAppointment);

export default router;
