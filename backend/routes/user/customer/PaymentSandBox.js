import express from "express";
import { paypalSuccess } from "../../../controllers/user/customer/PaymentSandBox.js";

const router = express.Router();

router.post("/paypal-success", paypalSuccess);

export default router;
