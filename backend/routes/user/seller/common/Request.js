import express from "express";
import { requestSellerRole } from "../../../../controllers/user/seller/common/Request.js";

const router = express.Router();

router.post("/request-seller-role", requestSellerRole);

export default router;
