import express from "express";
import { registerCustomer } from "../../../controllers/user/customer/Signup.js";

const router = express.Router();

router.post("/register/customer", registerCustomer);

export default router;
