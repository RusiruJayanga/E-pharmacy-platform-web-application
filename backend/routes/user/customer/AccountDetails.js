import express from "express";
import {
  getAppointmentById,
  getOrderDetailsById,
  getRequestDetails,
} from "../../../controllers/user/customer/AccountDetails.js";

const router = express.Router();

router.get("/appointment/:appointmentid", getAppointmentById);
router.get("/order/:orderId", getOrderDetailsById);
router.get("/request/:requestId", getRequestDetails);

export default router;
