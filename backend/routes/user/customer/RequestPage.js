import express from "express";
import { getRequestsByCustomer } from "../../../controllers/user/customer/RequestPage.js";

const router = express.Router();

router.get("/customer", getRequestsByCustomer);

export default router;
