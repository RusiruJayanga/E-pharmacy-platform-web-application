import express from "express";
import { loginDoctor } from "../../../../controllers/user/seller/doctor/Login.js";

const router = express.Router();

router.post("/seller-login/doctor", loginDoctor);

export default router;
