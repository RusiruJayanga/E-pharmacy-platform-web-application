import express from "express";
import { getCustomerOrders } from "../../../controllers/user/customer/OrderPage.js";

const router = express.Router();

router.get("/customer", getCustomerOrders);

export default router;
