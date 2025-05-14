import express from "express";
import { getDoctorById } from "../../../controllers/user/customer/DoctorDetails.js";

const router = express.Router();

router.get("/:id", getDoctorById);

export default router;
