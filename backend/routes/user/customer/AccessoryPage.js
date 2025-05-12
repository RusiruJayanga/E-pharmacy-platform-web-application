import express from "express";
import { getAccessories } from "../../../controllers/user/customer/AccessoryPage.js";

const router = express.Router();

router.get("/", getAccessories);

export default router;
