import express from "express";
import { getCustomerAppointments } from "../../../controllers/user/customer/AppointmentPage.js";

const router = express.Router();

router.get("/customer", getCustomerAppointments);

export default router;
