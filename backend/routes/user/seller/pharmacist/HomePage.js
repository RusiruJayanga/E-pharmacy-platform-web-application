import express from "express";
import { getSellerDashboard } from "../../../../controllers/user/seller/pharmacist/HomePage.js";

const router = express.Router();

router.get("/:seller_Id", getSellerDashboard);

export default router;
