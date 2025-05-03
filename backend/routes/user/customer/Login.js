import express from "express";
import { loginCustomer } from "../../../controllers/user/customer/Login.js";

const router = express.Router();

router.post("/login/customer", loginCustomer);

export default router;
