import express from "express";
import { loginLab } from "../../../../controllers/user/seller/lab/Login.js";

const router = express.Router();

router.post("/seller-login/lab", loginLab);

export default router;
