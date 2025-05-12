import express from "express";
import { loginPharmacist } from "../../../../controllers/user/seller/pharmacist/Login.js";

const router = express.Router();

router.post("/seller-login/pharmacist", loginPharmacist);

export default router;
