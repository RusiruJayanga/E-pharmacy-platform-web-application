import express from "express";
import { getDoctors } from "../../../controllers/user/customer/DoctorPage.js";

const router = express.Router();

router.get("/", getDoctors);

export default router;
